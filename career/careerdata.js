(function () {
    'use strict';
    function pad(n) { return String(n).padStart(2, '0'); }
    function daysFromNow(n) { const d = new Date(); d.setDate(d.getDate() + n); return pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear(); }

    const JOBS = [
        /* ---- Original dataset ---- */
        { id: "RRB-NTPC-2026", 
        category: "Railway", 
        board: "RRB", 
        postDate: "23/08/2026", 
        postName: "NTPC Graduate & Undergraduate Posts", 
        qualification: "12th / Degree", 
        advertisement: "CEN 01/2026", 
        lastDate: "25-09-2026", 
        detailsUrl: "../rrb1.html" },

        { id: "venkatinsights", 
        category: "venkatinsights", 
        board: "venkatinsights", 
        postDate: "23/08/2026", 
        postName: "editor", 
        qualification: "editing", 
        advertisement: "not available", 
        lastDate: "26-08-2026", 
        detailsUrl: "https://www.youtube.com/venkyvenkat" },
        


        { id: "RRB-JE-2026", 
            category: "Railway",
             board: "RRB", 
             postDate: "19/08/2026", 
             postName: "Junior Engineer – 4029 Posts", 
             qualification: "Diploma / B.Tech", 
             advertisement: "CEN 02/2026", 
             lastDate: "13-09-2026", 
             detailsUrl: "#" },

        { id: "IBPS-PO-2026",
             category: "Banking",
              board: "IBPS", 
              postDate: "22/08/2026", 
              postName: "IBPS PO", 
              qualification: "Degree", 
              advertisement: "CRP PO/MT", 
              lastDate: "15-09-2026", 
              detailsUrl: "#" },


        { id: "IBPS-CLERK-2026",
             category: "Banking", 
             board: "IBPS", 
             postDate: "22/08/2026", 
             postName: "IBPS Clerk", 
             qualification: "Degree", 
             advertisement: "CRP Clerks", 
             lastDate: "30-08-2026", 
             detailsUrl: "#" },


        { id: "ARMY-AGNI-2026", category: "Defence", board: "Indian Army", postDate: "21/08/2026", postName: "Agniveer General Duty", qualification: "10th / 12th", advertisement: "Army/2026", lastDate: "10-09-2026", detailsUrl: "#" },
        { id: "DRDO-SCI-2026", category: "DRDO", board: "DRDO", postDate: "22/08/2026", postName: "DRDO Scientist B", qualification: "B.Tech / M.Tech", advertisement: "DRDO/2026", lastDate: "15-09-2026", detailsUrl: "#" },
        { id: "NTPC-ENG-2026", category: "PSU", board: "NTPC", postDate: "22/08/2026", postName: "Executive / Engineer", qualification: "B.Tech / Degree", advertisement: "NTPC/2026", lastDate: "10-09-2026", detailsUrl: "#" },
        { id: "CIL-MT-2026", category: "Mining", board: "CIL", postDate: "21/08/2026", postName: "Management Trainee", qualification: "Engineering Degree", advertisement: "CIL/2026", lastDate: "15-09-2026", detailsUrl: "#" },
        { id: "KVS-TCH-2026", category: "Teaching", board: "KVS", postDate: "22/08/2026", postName: "PRT / TGT / PGT Teacher", qualification: "B.Ed / TET", advertisement: "KVS/2026", lastDate: "15-09-2026", detailsUrl: "#" },
        { id: "UPSC-CSE-2026", category: "UPSC", board: "UPSC", postDate: "22/08/2026", postName: "Civil Services Examination (IAS/IPS)", qualification: "Degree", advertisement: "CSE/2026", lastDate: "15-09-2026", detailsUrl: "#" },
        { id: "SSC-CGL-2026", category: "SSC", board: "SSC", postDate: "22/08/2026", postName: "Combined Graduate Level (CGL)", qualification: "Degree", advertisement: "SSC/2026", lastDate: "15-09-2026", detailsUrl: "#" },

        /* ---- Demo entries with LIVE dates (relative to today) ---- */
        { id: "NAVY-SSR", category: "Defence", board: "Indian Navy", postDate: daysFromNow(-2), postName: "SSR Agniveer – 1400 Posts", qualification: "12th (PCM)", advertisement: "Navy/02/2026", lastDate: daysFromNow(3), detailsUrl: "#" },
        { id: "TSLPRB-CONST", category: "Police", board: "TSLPRB", postDate: daysFromNow(-3), postName: "Police Constable – 7112 Posts", qualification: "10th / 12th", advertisement: "TSLPRB/2026", lastDate: daysFromNow(5), detailsUrl: "#" },
        { id: "RRC-APP", category: "Railway", board: "RRC", postDate: daysFromNow(-1), postName: "Act Apprentice – 1853 Posts", qualification: "ITI / Diploma", advertisement: "RRC/2026", lastDate: daysFromNow(6), detailsUrl: "#" },
        { id: "SBI-JA", category: "Banking", board: "SBI", postDate: daysFromNow(-4), postName: "Junior Associate (Clerk) – 8773 Posts", qualification: "Degree", advertisement: "SBI/CRPD/2026", lastDate: daysFromNow(7), detailsUrl: "#" },
        { id: "SSC-MTS", category: "SSC", board: "SSC", postDate: daysFromNow(-2), postName: "Multi Tasking Staff (MTS)", qualification: "10th", advertisement: "SSC/MTS/2026", lastDate: daysFromNow(12), detailsUrl: "#" },
        { id: "AIIMS-NO", category: "Healthcare", board: "AIIMS", postDate: daysFromNow(-5), postName: "Nursing Officer – 4455 Posts", qualification: "B.Sc Nursing", advertisement: "AIIMS/2026", lastDate: daysFromNow(15), detailsUrl: "#" },
        { id: "NIC-SCIB", category: "Technical Jobs", board: "NIC", postDate: daysFromNow(-3), postName: "Scientist B & Scientific Officer", qualification: "B.E / B.Tech / MCA", advertisement: "NIC/2026", lastDate: daysFromNow(9), detailsUrl: "#" },
        { id: "DHC-CLERK", category: "Judiciary", board: "Delhi High Court", postDate: daysFromNow(-6), postName: "Junior Judicial Assistant – 123 Posts", qualification: "Degree", advertisement: "DHC/2026", lastDate: daysFromNow(14), detailsUrl: "#" },
        { id: "UPSC-EPFO", category: "UPSC", board: "UPSC", postDate: daysFromNow(-1), postName: "EPFO Enforcement Officer – 418 Posts", qualification: "Degree", advertisement: "UPSC/EPFO/2026", lastDate: daysFromNow(18), detailsUrl: "#" }
    ];

    window.VI_JOBS = JOBS;

    /* Feed the header ticker (formatted "05 Sep 2026" so CLOSING SOON detection works) */
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const CAT_MAP = { Railway: 'railway', Banking: 'bank', UPSC: 'upsc', Defence: 'defense', DRDO: 'defense', venkatinsights: 'venkatinsights',};
    function toTickerDate(str, withYear) {
        const p = String(str).split(/[-/]/);
        if (p.length !== 3) return str;
        return parseInt(p[0], 10) + ' ' + MONTHS[parseInt(p[1], 10) - 1] + (withYear ? ' ' + p[2] : '');
    }
    window.__VI_ALL_JOBS = JOBS.map(function (j) {
        return {
            title: j.board + ' ' + j.postName,
            category: CAT_MAP[j.category] || 'govt',
            date: toTickerDate(j.postDate, false),
            lastDate: toTickerDate(j.lastDate, true)
        };
    });
})();