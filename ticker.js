document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // TICKER DATA
    // title | lastDate | link
    // ==========================================

    const tickerData = [
        {
            title: "UPSC Civil Services Examination 2026",
            lastDate: "2026-08-30",
            link: "https://www.upsc.gov.in/"
        },
        {
            title: "SSC CGL Recruitment 2026",
            lastDate: "2026-09-05",
            link: "#ssc-cgl"
        },
        {
            title: "Railway Recruitment Board Latest Vacancy",
            lastDate: "2026-09-15",
            link: "#railway"
        },
        {
            title: "DRDO Apprentice Recruitment 2026",
            lastDate: "2026-08-29",
            link: "#drdo"
        },
        {
            title: "Banking Recruitment Notification 2026",
            lastDate: "2026-09-20",
            link: "#banking"
        }
    ];


    // ==========================================
    // GET STATUS BASED ON LAST DATE
    // ==========================================

    function getStatus(lastDate) {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const deadline = new Date(lastDate);
        deadline.setHours(0, 0, 0, 0);

        const difference =
            Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));


        // Deadline passed
        if (difference < 0) {
            return {
                text: "CLOSED",
                className: "closed"
            };
        }

        // Today
        if (difference === 0) {
            return {
                text: "BE QUICK",
                className: "urgent"
            };
        }

        // 1–2 days
        if (difference <= 2) {
            return {
                text: "BE QUICK",
                className: "urgent"
            };
        }

        // 3–7 days
        if (difference <= 7) {
            return {
                text: "ENDING SOON",
                className: "soon"
            };
        }

        // More than 7 days
        return {
            text: "LATEST",
            className: "latest"
        };
    }


    // ==========================================
    // FORMAT DATE
    // ==========================================

    function formatDate(date) {

        const d = new Date(date);

        return d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }


    // ==========================================
    // CREATE TICKER HTML
    // ==========================================

    const ticker = document.createElement("div");

    ticker.className = "news-ticker";

    ticker.innerHTML = `
        <div class="ticker-heading">
            <span class="live-dot"></span>
            <span>UPDATES</span>
        </div>

        <div class="ticker-window">
            <div class="ticker-track">

                ${tickerData.map(item => {

                    const status = getStatus(item.lastDate);

                    return `
                        <a
                            href="${item.link}"
                            class="ticker-item"
                        >

                            <span class="ticker-status ${status.className}">
                                ${status.text}
                            </span>

                            <span class="ticker-title">
                                ${item.title}
                            </span>

                            <span class="ticker-date">
                                Last Date: ${formatDate(item.lastDate)}
                            </span>

                        </a>
                    `;

                }).join("")}

            </div>
        </div>

        <button
            class="ticker-close"
            aria-label="Close ticker"
        >
            ×
        </button>
    `;


    // Put ticker at top of page
    document.body.prepend(ticker);


    // ==========================================
    // TICKER CSS
    // ==========================================

    const style = document.createElement("style");

    style.textContent = `

        .news-ticker {
            width: 100%;
            height: 46px;

            display: flex;
            align-items: center;

            background: #111827;
            color: #fff;

            overflow: hidden;

            font-family: Inter, sans-serif;

            position: relative;
            z-index: 9999;
        }


        /* LEFT LABEL */

        .ticker-heading {
            height: 100%;
            min-width: 105px;

            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            background: #dc2626;

            font-size: 12px;
            font-weight: 800;
            letter-spacing: .7px;

            flex-shrink: 0;
        }


        .live-dot {
            width: 8px;
            height: 8px;

            border-radius: 50%;

            background: #fff;

            animation: livePulse 1s infinite;
        }


        /* SCROLL AREA */

        .ticker-window {
            flex: 1;

            overflow: hidden;

            white-space: nowrap;
        }


        .ticker-track {
            display: inline-flex;

            align-items: center;

            white-space: nowrap;

            animation: tickerMove 40s linear infinite;

            will-change: transform;
        }


        /* EACH ITEM */

        .ticker-item {
            display: inline-flex;

            align-items: center;

            gap: 10px;

            margin-right: 70px;

            color: #fff;

            text-decoration: none;

            font-size: 13px;
        }


        .ticker-item:hover {
            color: #facc15;
        }


        /* STATUS TAG */

        .ticker-status {
            padding: 4px 9px;

            border-radius: 4px;

            font-size: 10px;

            font-weight: 800;

            letter-spacing: .4px;
        }


        /* URGENT */

        .ticker-status.urgent {
            background: #dc2626;
            color: #fff;

            animation: urgentBlink 1.2s infinite;
        }


        /* SOON */

        .ticker-status.soon {
            background: #f59e0b;
            color: #111;
        }


        /* LATEST */

        .ticker-status.latest {
            background: #16a34a;
            color: #fff;
        }


        /* CLOSED */

        .ticker-status.closed {
            background: #6b7280;
            color: #fff;
        }


        .ticker-title {
            font-weight: 600;
        }


        .ticker-date {
            color: #cbd5e1;

            font-size: 12px;
        }


        /* CLOSE */

        .ticker-close {
            width: 42px;
            height: 100%;

            border: none;

            background: #111827;

            color: #fff;

            font-size: 22px;

            cursor: pointer;

            flex-shrink: 0;
        }


        .ticker-close:hover {
            background: #1f2937;
        }


        /* PAUSE ON HOVER */

        .news-ticker:hover .ticker-track {
            animation-play-state: paused;
        }


        /* ANIMATION */

        @keyframes tickerMove {

            0% {
                transform: translateX(100%);
            }

            100% {
                transform: translateX(-100%);
            }

        }


        @keyframes livePulse {

            0%,
            100% {
                opacity: 1;
                transform: scale(1);
            }

            50% {
                opacity: .3;
                transform: scale(.7);
            }

        }


        @keyframes urgentBlink {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: .65;
            }

        }


        /* MOBILE */

        @media (max-width: 600px) {

            .news-ticker {
                height: 42px;
            }

            .ticker-heading {
                min-width: 82px;
                font-size: 10px;
            }

            .ticker-item {
                font-size: 12px;
                margin-right: 45px;
            }

            .ticker-date {
                font-size: 11px;
            }

            .ticker-close {
                width: 35px;
            }

        }

    `;


    document.head.appendChild(style);


    // ==========================================
    // CLOSE BUTTON
    // ==========================================

    ticker
        .querySelector(".ticker-close")
        .addEventListener("click", function () {

            ticker.remove();

        });

});