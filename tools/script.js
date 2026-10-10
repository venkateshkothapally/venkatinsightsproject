(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = {
    nextYearId: 2,
    nextSemesterId: 3,
    nextSubjectId: 3,
    years: [{
      id: 1,
      name: "Year 1",
      semesters: [
        { id: 1, name: "Semester 1", subjects: [{ id: 1, name: "Subject 1", obtained: "", maximum: "100", credits: "3" }] },
        { id: 2, name: "Semester 2", subjects: [{ id: 2, name: "Subject 1", obtained: "", maximum: "100", credits: "3" }] }
      ]
    }]
  };

  const num = value => value === "" || value == null ? null : Number(value);
  const fmt = value => value == null || !Number.isFinite(value) ? "—" : value.toFixed(2);
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
  const validMark = subject => {
    const got = num(subject.obtained), max = num(subject.maximum);
    return got !== null && max !== null && Number.isFinite(got) && Number.isFinite(max) &&
      max > 0 && got >= 0 && got <= max;
  };
  const scale = () => Number($("#gradeScale").value);

  function calcSemester(semester) {
    const valid = semester.subjects.filter(validMark);
    const earned = valid.reduce((sum, s) => sum + Number(s.obtained), 0);
    const maximum = valid.reduce((sum, s) => sum + Number(s.maximum), 0);
    const credits = valid.reduce((sum, s) => sum + Math.max(0, Number(s.credits) || 0), 0);
    const weighted = valid.reduce((sum, s) => {
      const points = Math.min(scale(), (Number(s.obtained) / Number(s.maximum)) * scale());
      return sum + points * Math.max(0, Number(s.credits) || 0);
    }, 0);
    return {
      earned, maximum, credits,
      percentage: maximum > 0 ? earned / maximum * 100 : null,
      sgpa: credits > 0 ? weighted / credits : null
    };
  }

  function calcOverall() {
    const results = state.years.flatMap(year => year.semesters.map(semester => calcSemester(semester)));
    const earned = results.reduce((sum, result) => sum + result.earned, 0);
    const maximum = results.reduce((sum, result) => sum + result.maximum, 0);
    const credits = results.reduce((sum, result) => sum + result.credits, 0);
    const weightedSgpa = results.reduce((sum, result) => sum + (result.sgpa ?? 0) * result.credits, 0);
    return {
      earned, maximum, credits,
      percentage: maximum > 0 ? earned / maximum * 100 : null,
      cgpa: credits > 0 ? weightedSgpa / credits : null
    };
  }

  function subjectMarkup(subject) {
    const pct = validMark(subject) ? Number(subject.obtained) / Number(subject.maximum) * 100 : null;
    return `
      <div class="subject-row" data-subject-id="${subject.id}">
        <div class="subject-top">
          <input class="subject-name" aria-label="Subject name" data-field="name" value="${esc(subject.name)}" placeholder="Subject name">
          <button class="button small-button remove-button" data-action="remove-subject" type="button">Remove</button>
        </div>
        <div class="subject-fields">
          <label>Obtained
            <input type="number" min="0" step="any" data-field="obtained" value="${esc(subject.obtained)}" placeholder="0">
          </label>
          <label>Max marks
            <input type="number" min="0.01" step="any" data-field="maximum" value="${esc(subject.maximum)}" placeholder="100">
          </label>
          <label>Credits
            <input type="number" min="0" step="any" data-field="credits" value="${esc(subject.credits)}" placeholder="3">
          </label>
          <div class="subject-pct"><span>Percentage</span><strong>${fmt(pct)}${pct == null ? "" : "%"}</strong></div>
        </div>
      </div>`;
  }

  function semesterMarkup(year, semester) {
    const result = calcSemester(semester);
    return `
      <section class="semester-card" data-semester-id="${semester.id}">
        <div class="semester-top">
          <input class="semester-name" aria-label="Semester name" data-semester-name value="${esc(semester.name)}">
          <button class="button small-button remove-button" data-action="remove-semester" type="button">Remove</button>
        </div>
        <div class="subject-list">${semester.subjects.map(subjectMarkup).join("") || '<p class="empty-state">No subjects. Add a subject to begin.</p>'}</div>
        <button class="button button-ghost small-button add-subject" data-action="add-subject" type="button">＋ Add subject</button>
        <div class="semester-results">
          <div class="result-tile"><span>Semester percentage</span><strong data-semester-percentage>${fmt(result.percentage)}${result.percentage == null ? "" : "%"}</strong><small data-semester-marks>${result.earned} / ${result.maximum} marks</small></div>
          <div class="result-tile violet"><span>Estimated SGPA</span><strong data-semester-sgpa>${fmt(result.sgpa)}</strong><small data-semester-credits>${fmt(result.credits)} credits entered</small></div>
        </div>
      </section>`;
  }

  function yearMarkup(year) {
    return `
      <article class="year-card" data-year-id="${year.id}">
        <div class="year-top">
          <input class="year-name" aria-label="Academic year name" data-year-name value="${esc(year.name)}">
          <div class="year-actions">
            <button class="button small-button" data-action="add-semester" type="button">＋ Add semester</button>
            <button class="button small-button remove-button" data-action="remove-year" type="button" ${state.years.length <= 1 ? "disabled" : ""}>Remove year</button>
          </div>
        </div>
        <div class="semester-grid">${year.semesters.map(semester => semesterMarkup(year, semester)).join("") || '<p class="empty-state">No semesters yet. Use “Add semester” to start.</p>'}</div>
      </article>`;
  }

  function renderAll() {
    $("#yearsContainer").innerHTML = state.years.map(yearMarkup).join("");
    refreshSummary();
  }

  function refreshSummary() {
    const overall = calcOverall();
    $("#overallPercentage").textContent = overall.percentage == null ? "—" : `${fmt(overall.percentage)}%`;
    $("#overallMarks").textContent = `${fmt(overall.earned)} / ${fmt(overall.maximum)} entered marks`;
    $("#overallCgpa").textContent = fmt(overall.cgpa);
    $("#yearCount").textContent = state.years.length;
    $("#semesterCount").textContent = `${state.years.reduce((sum, year) => sum + year.semesters.length, 0)} semesters added`;
    // Refresh calculated values in each currently rendered semester without rebuilding inputs.
    for (const year of state.years) {
      const yearEl = $(`[data-year-id="${year.id}"]`);
      if (!yearEl) continue;
      for (const semester of year.semesters) {
        const semesterEl = $(`[data-semester-id="${semester.id}"]`, yearEl);
        if (!semesterEl) continue;
        const result = calcSemester(semester);
        semesterEl.querySelector("[data-semester-percentage]").textContent = result.percentage == null ? "—" : `${fmt(result.percentage)}%`;
        semesterEl.querySelector("[data-semester-marks]").textContent = `${fmt(result.earned)} / ${fmt(result.maximum)} marks`;
        semesterEl.querySelector("[data-semester-sgpa]").textContent = fmt(result.sgpa);
        semesterEl.querySelector("[data-semester-credits]").textContent = `${fmt(result.credits)} credits entered`;
        for (const subject of semester.subjects) {
          const subjectEl = $(`[data-subject-id="${subject.id}"]`, semesterEl);
          if (!subjectEl) continue;
          const pct = validMark(subject) ? Number(subject.obtained) / Number(subject.maximum) * 100 : null;
          $(".subject-pct strong", subjectEl).textContent = pct == null ? "—" : `${fmt(pct)}%`;
          const maxInput = $('[data-field="maximum"]', subjectEl);
          const gotInput = $('[data-field="obtained"]', subjectEl);
          const invalid = gotInput.value !== "" && maxInput.value !== "" &&
            (Number(maxInput.value) <= 0 || Number(gotInput.value) < 0 || Number(gotInput.value) > Number(maxInput.value));
          gotInput.setCustomValidity(invalid ? "Obtained marks must be between zero and maximum marks." : "");
          maxInput.setCustomValidity(maxInput.value !== "" && Number(maxInput.value) <= 0 ? "Maximum marks must be greater than zero." : "");
          gotInput.setAttribute("aria-invalid", String(invalid));
          maxInput.setAttribute("aria-invalid", String(maxInput.value !== "" && Number(maxInput.value) <= 0));
        }
      }
    }
  }

  function findYear(id) { return state.years.find(year => year.id === Number(id)); }
  function findSemester(year, id) { return year?.semesters.find(semester => semester.id === Number(id)); }

  $("#basicObtained").addEventListener("input", updateBasic);
  $("#basicMaximum").addEventListener("input", updateBasic);
  function updateBasic() {
    const got = num($("#basicObtained").value), max = num($("#basicMaximum").value);
    const valid = got !== null && max !== null && Number.isFinite(got) && Number.isFinite(max) && max > 0 && got >= 0 && got <= max;
    $("#basicPercentage").textContent = valid ? `${fmt(got / max * 100)}%` : "—";
    $("#basicSummary").textContent = valid ? `${got.toLocaleString()} out of ${max.toLocaleString()} marks` : "Enter valid marks to calculate.";
    $("#basicLost").textContent = valid ? `Marks lost: ${(max - got).toLocaleString()}` : "";
    $("#basicObtained").setCustomValidity($("#basicObtained").value !== "" && got < 0 ? "Marks cannot be negative." : ($("#basicObtained").value !== "" && max > 0 && got > max ? "Obtained marks cannot exceed maximum marks." : ""));
    $("#basicMaximum").setCustomValidity($("#basicMaximum").value !== "" && max <= 0 ? "Maximum marks must be greater than zero." : "");
  }

  $("#showAdvanced").addEventListener("click", () => {
    $("#basicView").classList.add("hidden");
    $("#advancedView").classList.remove("hidden");
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  $("#showBasic").addEventListener("click", () => {
    $("#advancedView").classList.add("hidden");
    $("#basicView").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  $("#gradeScale").addEventListener("change", () => {
    renderAll();
  });

  $("#addYear").addEventListener("click", () => {
    const yearId = state.nextYearId++;
    const semA = state.nextSemesterId++;
    const semB = state.nextSemesterId++;
    const subA = state.nextSubjectId++;
    const subB = state.nextSubjectId++;
    state.years.push({
      id: yearId, name: `Year ${state.years.length + 1}`,
      semesters: [
        { id: semA, name: "Semester 1", subjects: [{ id: subA, name: "Subject 1", obtained: "", maximum: "100", credits: "3" }] },
        { id: semB, name: "Semester 2", subjects: [{ id: subB, name: "Subject 1", obtained: "", maximum: "100", credits: "3" }] }
      ]
    });
    renderAll();
  });

  $("#yearsContainer").addEventListener("input", event => {
    const target = event.target;
    const yearEl = target.closest("[data-year-id]");
    if (!yearEl) return;
    const year = findYear(yearEl.dataset.yearId);
    if (!year) return;
    if (target.matches("[data-year-name]")) {
      year.name = target.value;
      return;
    }
    const semesterEl = target.closest("[data-semester-id]");
    if (!semesterEl) return;
    const semester = findSemester(year, semesterEl.dataset.semesterId);
    if (!semester) return;
    if (target.matches("[data-semester-name]")) {
      semester.name = target.value;
      return;
    }
    const subjectEl = target.closest("[data-subject-id]");
    if (!subjectEl) return;
    const subject = semester.subjects.find(item => item.id === Number(subjectEl.dataset.subjectId));
    if (!subject) return;
    const field = target.dataset.field;
    if (field) subject[field] = target.value;
    refreshSummary();
  });

  $("#yearsContainer").addEventListener("change", event => {
    if (event.target.matches("input[type=number]")) refreshSummary();
  });

  $("#yearsContainer").addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    const yearEl = button.closest("[data-year-id]");
    const year = yearEl ? findYear(yearEl.dataset.yearId) : null;
    const semesterEl = button.closest("[data-semester-id]");
    const semester = year && semesterEl ? findSemester(year, semesterEl.dataset.semesterId) : null;
    const subjectEl = button.closest("[data-subject-id]");
    const subjectId = subjectEl ? Number(subjectEl.dataset.subjectId) : null;

    if (action === "add-semester" && year) {
      year.semesters.push({
        id: state.nextSemesterId++, name: `Semester ${year.semesters.length + 1}`,
        subjects: [{ id: state.nextSubjectId++, name: "Subject 1", obtained: "", maximum: "100", credits: "3" }]
      });
    } else if (action === "remove-year" && year && state.years.length > 1) {
      state.years = state.years.filter(item => item.id !== year.id);
    } else if (action === "remove-semester" && year && semester) {
      year.semesters = year.semesters.filter(item => item.id !== semester.id);
    } else if (action === "add-subject" && year && semester) {
      semester.subjects.push({ id: state.nextSubjectId++, name: `Subject ${semester.subjects.length + 1}`, obtained: "", maximum: "100", credits: "3" });
    } else if (action === "remove-subject" && year && semester && subjectId !== null) {
      semester.subjects = semester.subjects.filter(item => item.id !== subjectId);
    }
    renderAll();
  });

  $("#printResults").addEventListener("click", () => {
    $("#basicView").classList.add("print-basic");
    window.print();
    $("#basicView").classList.remove("print-basic");
  });

  $("#resetAll").addEventListener("click", () => {
    $("#basicObtained").value = "";
    $("#basicMaximum").value = "600";
    $("#gradeScale").value = "10";
    state.nextYearId = 2;
    state.nextSemesterId = 3;
    state.nextSubjectId = 3;
    state.years = [{
      id: 1, name: "Year 1",
      semesters: [
        { id: 1, name: "Semester 1", subjects: [{ id: 1, name: "Subject 1", obtained: "", maximum: "100", credits: "3" }] },
        { id: 2, name: "Semester 2", subjects: [{ id: 2, name: "Subject 1", obtained: "", maximum: "100", credits: "3" }] }
      ]
    }];
    updateBasic();
    renderAll();
    $("#advancedView").classList.add("hidden");
    $("#basicView").classList.remove("hidden");
  });

  updateBasic();
  renderAll();
})();