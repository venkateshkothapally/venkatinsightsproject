  
const newspapersData=[
{name:"Eenadu",
type:"EPAPER",
language:"Telugu",
subcat:"Telugu ePapers",
description:"Telugu daily newspaper and digital e-paper edition.",
link:"https://epaper.eenadu.net/",
logo:"https://epaper.eenadu.net//img/logo.png"},




{name:"Sakshi",
type:"EPAPER",
language:"Telugu",
subcat:"Telugu ePapers",
description:"Telugu news, latest updates and e-paper.",
link:"https://epaper.sakshi.com/",
logo:"https://www.sakshi.com/themes/custom/sakshi/assets/images/logo.png"},

{name:"Dinakaran",
type:"EPAPER",
language:"Tamil",
subcat:"Tamil ePapers",
description:"Tamil daily newspaper and digital e-paper edition.",
link:"https://epaper.dinakaran.com/",
logo:"https://epaper.dinakaran.com//img/logo.png"},

{name:"Dinamalar",
type:"EPAPER",
language:"Tamil",
subcat:"Tamil ePapers",
description:"Tamil daily newspaper and digital e-paper edition.",
link:"https://epaper.dinamalar.com/",
logo:"https://epaper.dinamalar.com//img/logo.png"},

{name:"The Hindu",
type:"NEWSPAPER",
language:"English",
subcat:"English News Papers",
description:"The Hindu is a daily Indian English-language newspaper published in Chennai, Mumbai, New Delhi, Bengaluru, Kolkata, Hyderabad, Pune, Ahmedabad, Lucknow, Chandigarh, Patna, Indore, Jaipur, Surat, Ludhiana, Nagpur, Varanasi, Gurugram, Chandigarh, and Vishakapatnam.",
link:"https://www.thehindu.com/",
logo:"https://www.thehindu.com/static/theme/default/base/images/logo.png"},

{name:"The Times of India",type:"NEWSPAPER",language:"English",subcat:"English News Papers",description:"The Times of India is an Indian English-language daily newspaper owned by The Times Group, the largest media conglomerate in India.",link:"https://timesofindia.indiatimes.com/",logo:"https://static.toiimg.com/photo/72975551.cms"}, {name:"Dinamalar",type:"EPAPER",language:"Tamil",subcat:"Tamil ePapers",description:"Tamil daily newspaper and digital e-paper edition.",link:"https://epaper.dinamalar.com/",logo:"https://epaper.dinamalar.com//img/logo.png"},     
{name:"Andhra Jyothi",type:"EPAPER",language:"Telugu",subcat:"Telugu ePapers",description:"Telugu newspaper and online edition.",link:"https://epaper.andhrajyothy.com/",logo:"https://static.andhrajyothy.com/assets/images/logo.png"},
{name:"Namasthe Telangana",type:"EPAPER",language:"Telugu",subcat:"Telugu ePapers",description:"Telangana-focused Telugu daily e-paper.",link:"https://epaper.ntnews.com/",logo:"https://epaper.ntnews.com//img/logo.png"},
{name:"Nava Telangana",type:"EPAPER",language:"Telugu",subcat:"Telugu ePapers",description:"Telugu daily newspaper digital edition.",link:"https://epaper.navatelangana.com/",logo:"https://epaper.navatelangana.com//img/logo/logo.png"},
{name:"Mana Telangana",type:"EPAPER",language:"Telugu",subcat:"Telugu ePapers",description:"Telugu news and digital newspaper.",link:"https://epaper.manatelangana.news/",logo:"https://cache.epapr.in/wlconfiguploads/masthead682c82d93b4d9.jpeg"},
{name:"The Hindu",type:"EPAPER",language:"English",subcat:"English ePapers",description:"English national daily digital newspaper.",link:"https://epaper.thehindu.com/",logo:"https://epaper.thehindu.com/logo/th_ep_logo.svg"},
{name:"Times of India",type:"EPAPER",language:"English",subcat:"English ePapers",description:"English daily e-paper edition.",link:"https://epaper.timesgroup.com/",logo:"https://img.etimg.com/photo/105474636.cms"},
{name:"Deccan Chronicle",type:"EPAPER",language:"English",subcat:"English ePapers",description:"English newspaper digital edition.",link:"https://epaper.deccanchronicle.com/",logo:""},
{name:"The Hindu",type:"NEWS",language:"English",subcat:"English Websites",description:"Latest national and international news.",link:"https://www.thehindu.com/",logo:""},
{name:"Indian Express",type:"NEWS",language:"English",subcat:"English Websites",description:"Breaking news, explainers and analysis.",link:"https://indianexpress.com/",logo:""},
{name:"Hindustan Times",type:"NEWS",language:"English",subcat:"English Websites",description:"Latest news, business, sports and more.",link:"https://www.hindustantimes.com/",logo:""},
{name:"BBC News",type:"NEWS",language:"English",subcat:"English Websites",description:"International news and analysis.",link:"https://www.bbc.com/news",logo:""},
{name:"NDTV",type:"NEWS",language:"English",subcat:"English Websites",description:"Latest India and world news.",link:"https://www.ndtv.com/",logo:""}
];

const publishedArticles=[
{id:1,date:"2026-08-10",
featured:true,
category:"Technology",
title:"How Artificial Intelligence Is Changing Everyday Digital Services",
image:"https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
excerpt:"Artificial intelligence is transforming government services, education, productivity and everyday digital experiences.",
author:"Venkat Insights",
readingTime:"6 min read",
tags:["AI","Technology","Digital Services"],
source:"Venkat Insights",
link:"https://example.com",
content:`<p>Artificial intelligence is becoming an important part of modern digital services. Governments, educational institutions and private organizations are increasingly using intelligent systems to improve accessibility, automation and user experience.</p><h3>AI in Government Services</h3><p>Digital platforms can use AI-assisted systems to help citizens find information, understand application requirements and navigate online services more efficiently.</p><h3>AI in Education</h3><p>Students can use AI-powered tools for research, translation, writing assistance and productivity while continuing to verify important information through trusted sources.</p><h3>What Users Should Know</h3><p>AI can make digital services easier to use, but users should review important information and rely on official sources before submitting applications or making important decisions.</p>`},




{id:2,date:"2026-08-10",featured:true,category:"Government Services",title:"Complete Guide to Online Government Services in Telangana",image:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",excerpt:"A practical overview of finding government portals, documents and citizen services online.",author:"Venkat News Desk",readingTime:"7 min read",tags:["Telangana","Government","Services"],source:"Venkat Insights",link:"https://example.com",content:`<p>Online government portals have made many citizen services easier to access. Users can locate official departments, application forms, status tracking and digital document services from their respective portals.</p><h3>Use Official Portals</h3><p>Always verify the web address and department before entering personal information. Avoid unofficial websites that request unnecessary credentials.</p><h3>Keep Documents Ready</h3><p>Depending on the service, applicants may need identity documents, certificates, photographs or application references.</p>`},
{id:3,date:"2026-08-10",featured:true,category:"Education",title:"How Students Can Prepare for Competitive Entrance Exams",image:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",excerpt:"Build a realistic preparation plan using syllabus mapping, revision and mock tests.",author:"Education Bureau",readingTime:"5 min read",tags:["Education","Exams","Students"],source:"Venkat Insights",link:"https://example.com",content:`<p>Competitive examinations require consistent preparation rather than last-minute study. Start by understanding the syllabus and examination pattern.</p><h3>Create a Study Calendar</h3><p>Divide topics into manageable weekly targets and reserve time for revision and practice tests.</p><h3>Analyze Mock Tests</h3><p>Mock tests are most useful when students review mistakes and identify topics that need additional practice.</p>`},
{id:4,date:"2026-08-09",category:"Digital Services",title:"Digital Documents: How to Store and Access Important Certificates",image:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",excerpt:"Organize certificates and important digital documents securely for faster access.",author:"Digital Desk",readingTime:"4 min read",tags:["Documents","Digital","Security"],source:"Venkat Insights",link:"https://example.com",content:`<p>Digital copies of certificates can save time when applying for education, employment and government services. Keep files organized with clear names and dates.</p><h3>Use Secure Storage</h3><p>Choose trusted storage services and enable strong authentication wherever available.</p>`},
{id:5,date:"2026-08-09",category:"Cybersecurity",title:"Best Practices for Protecting Your Personal Information Online",image:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",excerpt:"Simple cybersecurity practices can reduce the risk of account compromise and online fraud.",author:"Tech Insights",readingTime:"5 min read",tags:["Cybersecurity","Privacy","Safety"],source:"Venkat Insights",link:"https://example.com",content:`<p>Protecting personal information starts with basic security habits. Use unique passwords, enable multi-factor authentication and be cautious with unexpected links.</p><h3>Check Before You Click</h3><p>Look at the domain name and context before entering credentials or downloading files.</p>`},
{id:6,date:"2026-08-08",category:"News",title:"Understanding E-Papers and Digital News Platforms",image:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",excerpt:"Learn how digital newspaper editions and online news platforms differ.",author:"News Desk",readingTime:"4 min read",tags:["Newspapers","ePaper","News"],source:"Venkat Insights",link:"https://example.com",content:`<p>Digital newspapers provide readers with access to newspaper editions through web and mobile platforms, while news websites can publish continuously throughout the day.</p><h3>ePaper vs News Website</h3><p>An ePaper generally follows the structure of a printed edition. A news website is designed for continuously updated stories and multimedia content.</p>`},
{id:7,date:"2026-08-07",category:"Career",title:"How to Apply for Government Services Online",image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",excerpt:"A simple workflow for finding official application pages and tracking submissions.",author:"Career Desk",readingTime:"5 min read",tags:["Career","Government","Applications"],source:"Venkat Insights",link:"https://example.com",content:`<p>Before applying online, identify the official department and read eligibility requirements carefully. Prepare the required documents before starting the application.</p>`},
{id:8,date:"2026-08-06",category:"Tutorials",title:"Essential Cybersecurity Tips for Students",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",excerpt:"Practical habits for protecting college accounts, devices and personal files.",author:"Tech Insights",readingTime:"4 min read",tags:["Students","Cybersecurity"],source:"Venkat Insights",link:"https://example.com",content:`<p>Students use many online accounts for education, banking and communication. Keeping those accounts secure should be part of everyday digital hygiene.</p>`},
{id:9,date:"2026-08-05",category:"Travel",title:"How Technology Is Changing Travel Planning in India",image:"https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",excerpt:"Maps, digital tickets and online services are making trip planning easier.",author:"Travel Desk",readingTime:"5 min read",tags:["Travel","Technology"],source:"Venkat Insights",link:"https://example.com",content:`<p>Travel planning has become increasingly digital. Travelers can compare routes, manage bookings, store tickets and discover destinations through online platforms.</p>`},
{id:10,date:"2026-08-04",category:"General Information",title:"A Beginner's Guide to Digital Productivity Tools",image:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",excerpt:"A practical introduction to digital tools for notes, documents, planning and collaboration.",author:"Venkat Insights",readingTime:"5 min read",tags:["Productivity","Tools"],source:"Venkat Insights",link:"https://example.com",content:`<p>Digital productivity tools can help users organize tasks, notes, files and projects. The best setup is one that remains simple enough to use consistently.</p>`}
];

let currentMainView="newspapers",activeNewspaperSubcat="All",selectedArticleDate="2026-08-10",articleLimit=9,currentArticleIndex=-1;

function switchMainView(view){
 currentMainView=view;
 document.querySelectorAll(".nav-pill").forEach(x=>x.classList.remove("active"));
 const pill=document.getElementById("pill-"+view);if(pill)pill.classList.add("active");
 ["services","newspapers","articles"].forEach(v=>document.getElementById(v+"ViewContainer").style.display="none");
 document.getElementById("subFilterContainer").style.display=view==="newspapers"?"flex":"none";
 document.getElementById(view+"ViewContainer").style.display=view==="services"?"grid":view==="newspapers"?"grid":"flex";
 if(view==="services"){viewMainTitle.innerText="Government Digital Portals";viewSubtitle.innerText="Access official government schemes, documents and utilities";renderSidebarForServices();renderServices();}
 if(view==="newspapers"){viewMainTitle.innerText="Newspapers & ePapers Directory";viewSubtitle.innerText="Browse live e-Papers, news channels & English news websites";renderSidebarForNewspapers();renderSubFiltersForNewspapers();renderNewspapers();}
 if(view==="articles"){viewMainTitle.innerText="Published Articles & Daily News Archive";viewSubtitle.innerText="Explore detailed articles, guides, announcements and daily news";renderSidebarForArticles();renderArticlesView();}
 window.scrollTo({top:0,behavior:"smooth"});
}
function renderSidebarForServices(){sidebarSectionTitle.innerText="Service Categories";sidebarMenu.innerHTML=servicesCategories.map(c=>`<button class="menu-item">▦ <span>${c.title}</span></button>`).join("")}
function renderSidebarForNewspapers(){sidebarSectionTitle.innerText="Newspaper Types";const cats=["All","Telugu ePapers","Telugu Websites","English ePapers","English Websites"];sidebarMenu.innerHTML=cats.map(x=>`<button class="menu-item ${x===activeNewspaperSubcat?"active":""}" onclick="activeNewspaperSubcat='${x}';renderSidebarForNewspapers();renderSubFiltersForNewspapers();renderNewspapers()">📰 <span>${x}</span></button>`).join("")}
function renderSidebarForArticles(){sidebarSectionTitle.innerText="Article Topics";const cats=["All Topics","Technology","Education","Government Services","Digital Services","Career","Exams","News","Tutorials","Travel","General Information"];sidebarMenu.innerHTML=cats.map(x=>`<button class="menu-item" onclick="filterArticleTopic('${x}')">▤ <span>${x}</span></button>`).join("")}
function renderSubFiltersForNewspapers(){const cats=["All","Telugu ePapers","Telugu Websites","English ePapers","English Websites"];subFilterContainer.innerHTML=cats.map(x=>`<button class="sub-pill ${x===activeNewspaperSubcat?"active":""}" onclick="activeNewspaperSubcat='${x}';renderSidebarForNewspapers();renderSubFiltersForNewspapers();renderNewspapers()">${x}</button>`).join("")}
function renderNewspapers(search=""){let list=newspapersData.filter(n=>activeNewspaperSubcat==="All"||n.subcat===activeNewspaperSubcat);const q=search.toLowerCase().trim();if(q)list=list.filter(n=>(n.name+" "+n.language+" "+n.type+" "+n.subcat+" "+n.description).toLowerCase().includes(q));newspapersViewContainer.innerHTML=list.length?list.map(n=>{const badge=n.type==="EPAPER"?"badge-epaper":n.type==="NEWS"?"badge-news":"badge-paper";return `<a class="newspaper-card" href="${n.link}" target="_blank" rel="noopener"><div class="newspaper-img-wrapper">${n.logo?`<img src="${n.logo}" alt="${n.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'newspaper-fallback\\'><div class=\\'newspaper-fallback-title\\'>${n.name}</div></div>'">`:`<div class="newspaper-fallback"><div class="newspaper-fallback-title">${n.name}</div></div>`}</div><div class="newspaper-body"><div class="newspaper-meta"><span class="newspaper-name">${n.name}</span><span class="newspaper-badge ${badge}">${n.type}</span></div><div style="font-size:.78rem;color:var(--muted);margin-top:4px">${n.language} • ${n.subcat}</div><p style="font-size:.86rem;color:var(--muted);margin:10px 0">${n.description}</p><div class="newspaper-action-btn">${n.type==="EPAPER"?"Read ePaper →":"Read News Online →"}</div></div></a>`}).join(""):`<div class="empty-state"><h3>No newspapers found</h3><p>Try another search or category.</p></div>`}
function renderServices(){servicesViewContainer.innerHTML=servicesCategories[0].services.map(s=>`<a class="service-card" href="${s.url}" target="_blank"><div class="card-header-left"><div class="card-logo">${s.logo?`<img src="${s.logo}" style="width:100%;height:100%;object-fit:contain" alt="">`:""}</div><span class="card-title">${s.name}</span></div><div class="card-desc">${s.desc}</div></a>`).join("")}
function renderArticlesView(){
 const search=(articleSearchInput.value||"").toLowerCase().trim(),cat=articleCategoryFilter.value,sort=articleSort.value;
 if(!articleCategoryFilter.dataset.ready){[...new Set(publishedArticles.map(a=>a.category))].sort().forEach(c=>articleCategoryFilter.add(new Option(c,c)));articleCategoryFilter.dataset.ready="1"}
 let list=publishedArticles.filter(a=>{const hay=(a.title+" "+a.category+" "+a.author+" "+a.excerpt+" "+a.tags.join(" ")+" "+a.date).toLowerCase();return(!search||hay.includes(search))&&(cat==="All"||a.category===cat)&&(selectedArticleDate==="ALL"||a.date===selectedArticleDate)});
 if(sort==="newest")list.sort((a,b)=>b.date.localeCompare(a.date));if(sort==="oldest")list.sort((a,b)=>a.date.localeCompare(b.date));if(sort==="az")list.sort((a,b)=>a.title.localeCompare(b.title));if(sort==="za")list.sort((a,b)=>b.title.localeCompare(a.title));
 document.getElementById("featuredArticlesGrid").innerHTML=publishedArticles.filter(a=>a.featured).slice(0,3).map(a=>featuredCard(a)).join("");
 const dates=[...new Set(publishedArticles.map(a=>a.date))].sort().reverse();quickDatesContainer.innerHTML=`<button class="date-pill ${selectedArticleDate==="ALL"?"active":""}" onclick="selectedArticleDate='ALL';renderArticlesView()">All Articles</button>`+dates.map(d=>`<button class="date-pill ${d===selectedArticleDate?"active":""}" onclick="handleDateSelect('${d}')">${d==="2026-08-10"?"Today":formatDate(d)}</button>`).join("");
 articleDatePicker.value=selectedArticleDate==="ALL"?"":selectedArticleDate;
 dailyArticlesGrid.innerHTML=list.length?list.slice(0,articleLimit).map(articleCard).join(""):`<div class="empty-state"><h3>No articles found</h3><p>Try another keyword, date or category.</p></div>`;
 loadMoreBtn.style.display=list.length>articleLimit?"block":"none";
}
function featuredCard(a){return `<div class="featured-card"><div class="featured-image"><img src="${a.image}" alt="${a.title}" loading="lazy" onerror="this.style.display='none'"></div><div class="featured-content"><span class="featured-tag">Featured • ${a.category}</span><h3 class="featured-title">${a.title}</h3><p class="featured-snippet">${a.excerpt}</p><small style="color:var(--muted)">${formatDate(a.date)} • ${a.readingTime}</small><br><button class="featured-read" style="border:0;margin-top:12px;cursor:pointer" onclick="openArticleById(${a.id})">Read Full Article →</button></div></div>`}
function articleCard(a){return `<article class="article-feed-card" onclick="openArticleById(${a.id})"><div class="article-thumb"><img src="${a.image}" alt="${a.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'newspaper-fallback\\'><div class=\\'newspaper-fallback-title\\'>${a.category}</div></div>'"></div><div class="article-feed-body"><div class="article-card-header"><span class="article-category">${a.category}</span><span style="font-size:.72rem;color:var(--muted)">📅 ${formatDate(a.date)}</span></div><h3 class="article-feed-title">${a.title}</h3><p class="article-feed-excerpt">${a.excerpt}</p><div class="article-card-footer"><span>By ${a.author} • ${a.readingTime}</span><span class="read-article-link">Read Article →</span></div></div></article>`}
function formatDate(d){return new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
function handleDateSelect(d){selectedArticleDate=d||"ALL";articleLimit=9;renderArticlesView()}
function loadMoreArticles(){articleLimit+=9;renderArticlesView()}
function filterArticleTopic(t){articleCategoryFilter.value=t==="All Topics"?"All":t;selectedArticleDate="ALL";renderArticlesView()}
function openArticleById(id){const i=publishedArticles.findIndex(a=>a.id===id);if(i<0)return;currentArticleIndex=i;const a=publishedArticles[i];modalArticleImage.src=a.image;modalArticleImage.alt=a.title;modalCategory.textContent=a.category;modalDate.textContent=formatDate(a.date);modalTitle.textContent=a.title;modalAuthor.textContent="By "+a.author;modalReadingTime.textContent=a.readingTime;modalExcerpt.textContent=a.excerpt;modalContent.innerHTML=a.content;modalTags.innerHTML=a.tags.map(t=>`<span class="tag">#${t}</span>`).join("");modalSource.textContent=a.source||a.author;modalOriginalLink.href=a.link||"#";articleModalOverlay.classList.add("active");document.body.style.overflow="hidden";updateArticleNav()}
function closeArticleModal(){articleModalOverlay.classList.remove("active");document.body.style.overflow=""}
function overlayClose(e){if(e.target===articleModalOverlay)closeArticleModal()}
function updateArticleNav(){previousArticleBtn.disabled=currentArticleIndex<=0;nextArticleBtn.disabled=currentArticleIndex>=publishedArticles.length-1;previousArticleBtn.style.opacity=previousArticleBtn.disabled?".45":"1";nextArticleBtn.style.opacity=nextArticleBtn.disabled?".45":"1"}
function openPreviousArticle(){if(currentArticleIndex>0)openArticleById(publishedArticles[currentArticleIndex-1].id)}
function openNextArticle(){if(currentArticleIndex<publishedArticles.length-1)openArticleById(publishedArticles[currentArticleIndex+1].id)}
async function shareCurrentArticle(){const a=publishedArticles[currentArticleIndex];if(navigator.share){try{await navigator.share({title:a.title,text:a.excerpt,url:a.link||location.href})}catch(e){}}else copyArticleLink()}
async function copyArticleLink(){const a=publishedArticles[currentArticleIndex];const url=a.link||location.href;try{await navigator.clipboard.writeText(url);alert("Article link copied.")}catch(e){alert("Copy failed. Please copy the link manually.")}}
function handleGlobalSearch(){const q=searchInput.value;clearSearchBtn.style.display=q?"block":"none";if(currentMainView==="newspapers")renderNewspapers(q);else if(currentMainView==="articles"){articleSearchInput.value=q;renderArticlesView()}else renderServices()}
function clearSearch(){searchInput.value="";handleGlobalSearch()}
window.toggleTheme=function(){const t=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=t;document.documentElement.classList.toggle("dark",t==="dark");localStorage.setItem("vi-theme",t);if(typeof window.syncThemeToggleIcons==="function")window.syncThemeToggleIcons();}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeArticleModal();if(e.key==="ArrowLeft"&&!articleModalOverlay.classList.contains("active"))return;if(e.key==="ArrowLeft"&&currentArticleIndex>0)openPreviousArticle();if(e.key==="ArrowRight"&&articleModalOverlay.classList.contains("active")&&currentArticleIndex<publishedArticles.length-1)openNextArticle()});
const savedTheme=localStorage.getItem("vi-theme");if(savedTheme){document.documentElement.dataset.theme=savedTheme;document.documentElement.classList.toggle("dark",savedTheme==="dark");if(typeof window.syncThemeToggleIcons==="function")window.syncThemeToggleIcons();}
switchMainView("newspapers");