// CareerHub - Job Application Portal
// jobs are fixed in this file, saved jobs and applications go in localStorage

let jobs = [
    {
        id: 1, title: "Frontend Developer Intern", company: "PixelCraft Studios", logo: "🎨",
        location: "Bengaluru", type: "Internship", category: "IT & Software",
        salary: 15000, salaryText: "₹15,000 / month", experience: "Fresher",
        posted: "2026-11-20", deadline: "2026-12-15",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        about: "We are a small design and web studio looking for an intern who loves building clean and responsive websites.",
        tasks: ["Convert Figma designs into web pages", "Fix bugs and improve page speed", "Work with the design team on new features"]
    },
    {
        id: 2, title: "Data Analyst", company: "BlueOcean Analytics", logo: "📊",
        location: "Gurugram", type: "Full-time", category: "Data & Analytics",
        salary: 45000, salaryText: "₹45,000 / month", experience: "0 - 2 years",
        posted: "2026-11-18", deadline: "2026-12-10",
        skills: ["Excel", "SQL", "Python", "Power BI"],
        about: "BlueOcean helps retail companies understand their sales data. You will turn raw data into useful reports.",
        tasks: ["Clean and analyse sales data", "Make weekly dashboards in Power BI", "Present findings to the client team"]
    },
    {
        id: 3, title: "Content Writer", company: "NovaEdu Learning", logo: "✍️",
        location: "Remote", type: "Part-time", category: "Content & Media",
        salary: 20000, salaryText: "₹20,000 / month", experience: "Fresher",
        posted: "2026-11-21", deadline: "2026-12-20",
        skills: ["English", "SEO", "Research", "Canva"],
        about: "An online learning platform for school students. We need someone who can explain topics in simple words.",
        tasks: ["Write blog posts and study notes", "Make simple graphics for posts", "Check content for grammar mistakes"]
    },
    {
        id: 4, title: "Graphic Designer", company: "UrbanKart", logo: "🛍️",
        location: "Mumbai", type: "Full-time", category: "Design",
        salary: 35000, salaryText: "₹35,000 / month", experience: "1 - 3 years",
        posted: "2026-11-15", deadline: "2026-12-05",
        skills: ["Photoshop", "Illustrator", "Figma", "Canva"],
        about: "UrbanKart is an online fashion store. Join our creative team to design banners, ads and social media posts.",
        tasks: ["Design banners for website and app", "Create social media creatives", "Maintain brand style guide"]
    },
    {
        id: 5, title: "Lab Assistant (Biotech)", company: "GreenLeaf Biosciences", logo: "🧪",
        location: "Chandigarh", type: "Full-time", category: "Science & Research",
        salary: 25000, salaryText: "₹25,000 / month", experience: "Fresher",
        posted: "2026-11-19", deadline: "2026-12-12",
        skills: ["PCR", "Cell Culture", "Lab Safety", "MS Excel"],
        about: "A research lab working on plant-based products. Good chance for B.Sc / M.Sc biotech students to get lab experience.",
        tasks: ["Prepare samples and solutions", "Help scientists in experiments", "Keep lab records up to date"]
    },
    {
        id: 6, title: "Python Developer", company: "ByteForge Technologies", logo: "💻",
        location: "Pune", type: "Full-time", category: "IT & Software",
        salary: 60000, salaryText: "₹60,000 / month", experience: "1 - 3 years",
        posted: "2026-11-22", deadline: "2027-01-10",
        skills: ["Python", "Django", "SQL", "Git"],
        about: "ByteForge builds software for hospitals and clinics. We are growing our backend team.",
        tasks: ["Build REST APIs using Django", "Write and fix database queries", "Review code of other team members"]
    },
    {
        id: 7, title: "Digital Marketing Intern", company: "SpiceRoute Foods", logo: "🌶️",
        location: "Delhi", type: "Internship", category: "Marketing",
        salary: 10000, salaryText: "₹10,000 / month", experience: "Fresher",
        posted: "2026-11-05", deadline: "2026-11-18",
        skills: ["Social Media", "Canva", "SEO", "Copywriting"],
        about: "A packaged food brand looking for a marketing intern to handle our Instagram and website.",
        tasks: ["Plan and post daily social media content", "Track likes, reach and followers", "Write product descriptions"]
    },
    {
        id: 8, title: "Customer Support Executive", company: "QuickServe Solutions", logo: "🎧",
        location: "Remote", type: "Full-time", category: "Customer Service",
        salary: 22000, salaryText: "₹22,000 / month", experience: "Fresher",
        posted: "2026-11-17", deadline: "2026-12-25",
        skills: ["Communication", "English", "Hindi", "MS Office"],
        about: "We handle customer support for online shopping websites. Work from home with a fixed shift.",
        tasks: ["Reply to customer chats and emails", "Solve order and refund issues", "Keep records of all tickets"]
    }
];

let saved = JSON.parse(localStorage.getItem("chSaved")) || [];                // saved job ids
let applications = JSON.parse(localStorage.getItem("chApplications")) || [];
let currentJob = null;    // job for which form is open

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


/* ================= helper functions ================= */

// today as yyyy-mm-dd (same format as date input)
function todayString() {
    let d = new Date();
    let mm = String(d.getMonth() + 1).padStart(2, "0");
    let dd = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + mm + "-" + dd;
}

// 2026-12-15 -> 15 Dec 2026
function niceDate(s) {
    let p = s.split("-");
    return parseInt(p[2]) + " " + months[parseInt(p[1]) - 1] + " " + p[0];
}

function daysAgo(s) {
    let diff = Math.floor((new Date(todayString()) - new Date(s)) / (1000 * 60 * 60 * 24));
    if (diff <= 0) return "Today";
    if (diff == 1) return "1 day ago";
    return diff + " days ago";
}

function isClosed(job) {
    return job.deadline < todayString();   // string compare works for yyyy-mm-dd
}

function findJob(id) {
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id == id) return jobs[i];
    }
    return null;
}

// so that < and > typed by user don't break the page
function clean(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toast(msg) {
    let t = document.getElementById("toast");
    t.innerHTML = msg;
    t.classList.add("show");
    setTimeout(function () {
        t.classList.remove("show");
    }, 2200);
}

function saveAll() {
    localStorage.setItem("chSaved", JSON.stringify(saved));
    localStorage.setItem("chApplications", JSON.stringify(applications));
}

function updateCounts() {
    document.getElementById("savedCount").innerHTML = saved.length;
    document.getElementById("appliedCount").innerHTML = applications.length;
}


/* ================= pages ================= */

function openPage(name) {
    let pages = document.querySelectorAll(".page");
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.add("hidden");
    }
    document.getElementById(name).classList.remove("hidden");

    let btns = document.querySelectorAll(".nav-btn");
    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
    }
    let nav = document.getElementById("nav-" + name);
    if (nav != null) nav.classList.add("active");

    if (name == "jobs") showJobs();
    if (name == "saved") showSaved();
    if (name == "applied") showApplications();
    window.scrollTo(0, 0);
}


/* ================= job listing ================= */

// fills filter dropdowns with values from the jobs list (no repeats)
function loadFilters() {
    let locations = [];
    let types = [];
    let categories = [];
    for (let i = 0; i < jobs.length; i++) {
        if (!locations.includes(jobs[i].location)) locations.push(jobs[i].location);
        if (!types.includes(jobs[i].type)) types.push(jobs[i].type);
        if (!categories.includes(jobs[i].category)) categories.push(jobs[i].category);
    }
    locations.sort();
    categories.sort();

    document.getElementById("filterLocation").innerHTML = makeOptions("All Locations", locations);
    document.getElementById("filterType").innerHTML = makeOptions("All Job Types", types);
    document.getElementById("filterCategory").innerHTML = makeOptions("All Categories", categories);
}

function makeOptions(firstText, list) {
    let html = "<option value='all'>" + firstText + "</option>";
    for (let i = 0; i < list.length; i++) {
        html += "<option>" + list[i] + "</option>";
    }
    return html;
}

function clearFilters() {
    document.getElementById("searchText").value = "";
    document.getElementById("filterLocation").value = "all";
    document.getElementById("filterType").value = "all";
    document.getElementById("filterCategory").value = "all";
    document.getElementById("sortBy").value = "new";
    showJobs();
}

function jobCard(job) {
    let closed = isClosed(job);
    let heartClass = saved.includes(job.id) ? "heart saved" : "heart";

    let skillTags = "";
    for (let i = 0; i < job.skills.length && i < 3; i++) {
        skillTags += "<span class='tag'>" + job.skills[i] + "</span>";
    }
    if (job.skills.length > 3) {
        skillTags += "<span class='tag'>+" + (job.skills.length - 3) + "</span>";
    }

    let statusTag = closed ? "<span class='tag closed-tag'>Closed</span>" : "";

    return "<div class='job-card" + (closed ? " closed" : "") + "'>" +
        "<div class='job-top'>" +
        "<div class='job-logo'>" + job.logo + "</div>" +
        "<div><div class='job-title'>" + job.title + "</div><div class='company'>" + job.company + "</div></div>" +
        "<button class='" + heartClass + "' title='Save job' onclick='toggleSave(" + job.id + ")'>&#10084;</button>" +
        "</div>" +
        "<div class='job-info'>" +
        "&#128205; " + job.location + " &nbsp; &#128176; " + job.salaryText + "<br>" +
        "<span class='tag type'>" + job.type + "</span>" + statusTag +
        " <span class='small'>&middot; " + daysAgo(job.posted) + "</span><br>" +
        skillTags +
        "</div>" +
        "<div class='job-bottom'>" +
        "<button class='btn outline' onclick='openDetails(" + job.id + ")'>View Details</button>" +
        "<button class='btn' onclick='startApply(" + job.id + ")' " + (closed ? "disabled" : "") + ">" + (closed ? "Closed" : "Apply Now") + "</button>" +
        "</div>" +
        "</div>";
}

function showJobs() {
    let text = document.getElementById("searchText").value.trim().toLowerCase();
    let loc = document.getElementById("filterLocation").value;
    let type = document.getElementById("filterType").value;
    let cat = document.getElementById("filterCategory").value;
    let sortBy = document.getElementById("sortBy").value;

    let list = [];
    for (let i = 0; i < jobs.length; i++) {
        let j = jobs[i];

        // search in title, company and skills
        let searchIn = (j.title + " " + j.company + " " + j.skills.join(" ")).toLowerCase();
        if (text != "" && !searchIn.includes(text)) continue;

        if (loc != "all" && j.location != loc) continue;
        if (type != "all" && j.type != type) continue;
        if (cat != "all" && j.category != cat) continue;
        list.push(j);
    }

    list.sort(function (a, b) {
        // closed jobs always go to the end
        if (isClosed(a) != isClosed(b)) return isClosed(a) ? 1 : -1;
        if (sortBy == "deadline") return a.deadline < b.deadline ? -1 : 1;
        if (sortBy == "salary") return b.salary - a.salary;
        return a.posted < b.posted ? 1 : -1;    // newest first
    });

    let html = "";
    for (let i = 0; i < list.length; i++) {
        html += jobCard(list[i]);
    }
    if (list.length == 0) {
        html = "<div class='empty'>No jobs found. Try a different search.</div>";
    }
    document.getElementById("jobList").innerHTML = html;
    document.getElementById("resultCount").innerHTML = list.length + (list.length == 1 ? " job found" : " jobs found");
}

function toggleSave(id) {
    if (saved.includes(id)) {
        saved.splice(saved.indexOf(id), 1);
        toast("Removed from saved jobs");
    } else {
        saved.push(id);
        toast("Job saved &#10084;");
    }
    saveAll();
    updateCounts();

    // refresh whichever page is open
    if (!document.getElementById("saved").classList.contains("hidden")) {
        showSaved();
    } else {
        showJobs();
    }
}

function showSaved() {
    let html = "";
    for (let i = 0; i < saved.length; i++) {
        let job = findJob(saved[i]);
        if (job != null) html += jobCard(job);
    }
    if (html == "") {
        html = "<div class='empty'>You have not saved any job yet. Click the &#10084; on a job to save it.</div>";
    }
    document.getElementById("savedList").innerHTML = html;
}


/* ================= job details popup ================= */

function openDetails(id) {
    let job = findJob(id);
    let closed = isClosed(job);

    let tasks = "";
    for (let i = 0; i < job.tasks.length; i++) {
        tasks += "<li>" + job.tasks[i] + "</li>";
    }
    let skills = "";
    for (let i = 0; i < job.skills.length; i++) {
        skills += "<span class='tag'>" + job.skills[i] + "</span>";
    }

    document.getElementById("detailBox").innerHTML =
        "<button class='close-x' onclick=\"hideModal('detailModal')\">&times;</button>" +
        "<div class='job-top'><div class='job-logo'>" + job.logo + "</div>" +
        "<div><div class='job-title'>" + job.title + "</div><div class='company'>" + job.company + "</div></div></div>" +
        "<div class='job-info'>" +
        "&#128205; " + job.location + " &nbsp;|&nbsp; " + job.type + " &nbsp;|&nbsp; " + job.category + "<br>" +
        "&#128176; " + job.salaryText + " &nbsp;|&nbsp; Experience: " + job.experience + "<br>" +
        "Posted: " + niceDate(job.posted) + " &nbsp;|&nbsp; Last date: <b>" + niceDate(job.deadline) + "</b>" +
        (closed ? " <span class='tag closed-tag'>Closed</span>" : "") +
        "</div>" +
        "<h4>About the job</h4><p>" + job.about + "</p>" +
        "<h4>What you will do</h4><ul>" + tasks + "</ul>" +
        "<h4>Skills needed</h4>" + skills +
        "<div class='job-bottom'><button class='btn' onclick='startApply(" + job.id + ")' " + (closed ? "disabled" : "") + ">" +
        (closed ? "Applications Closed" : "Apply for this job") + "</button></div>";

    document.getElementById("detailModal").classList.remove("hidden");
}

function hideModal(id) {
    document.getElementById(id).classList.add("hidden");
}

// close popup when clicking on the dark background
function closeModal(event, id) {
    if (event.target.id == id) hideModal(id);
}


/* ================= apply form ================= */

function startApply(id) {
    let job = findJob(id);
    if (isClosed(job)) {
        toast("Sorry, this job is closed");
        return;
    }
    currentJob = job;
    hideModal("detailModal");

    document.getElementById("applyJobInfo").innerHTML =
        "<div class='job-logo'>" + job.logo + "</div>" +
        "<div><div class='small'>Applying for</div><div class='job-title'>" + job.title + "</div>" +
        "<div class='company'>" + job.company + " &middot; " + job.location + " &middot; Last date " + niceDate(job.deadline) + "</div></div>";

    // skills of this job as checkboxes
    let html = "";
    for (let i = 0; i < job.skills.length; i++) {
        html += "<label><input type='checkbox' name='skill' value='" + job.skills[i] + "' onchange='checkSkills()'> " + job.skills[i] + "</label>";
    }
    document.getElementById("fSkills").innerHTML = html;

    resetForm();
    openPage("apply");
}

// shows error under a field, or makes it green if message is empty
function showError(id, message) {
    let box = document.getElementById(id);
    let err = document.getElementById(id + "Err");
    if (message == "") {
        box.classList.remove("invalid");
        box.classList.add("valid");
        err.innerHTML = "";
        return true;
    }
    box.classList.remove("valid");
    box.classList.add("invalid");
    err.innerHTML = message;
    return false;
}

// while typing, check again only if the field is already showing an error
function recheck(input, checkFunction) {
    if (input.classList.contains("invalid")) {
        checkFunction();
    }
}

function value(id) {
    return document.getElementById(id).value.trim();
}

function checkName() {
    let v = value("fName");
    if (v == "") return showError("fName", "Name is required");
    if (!/^[A-Za-z ]+$/.test(v)) return showError("fName", "Name can have only letters and spaces");
    if (v.length < 3) return showError("fName", "Name is too short");
    return showError("fName", "");
}

function checkEmail() {
    let v = value("fEmail");
    if (v == "") return showError("fEmail", "Email is required");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)) return showError("fEmail", "Enter a valid email like name@gmail.com");
    return showError("fEmail", "");
}

function checkPhone() {
    let v = value("fPhone");
    if (v == "") return showError("fPhone", "Mobile number is required");
    if (!/^[0-9]+$/.test(v)) return showError("fPhone", "Only digits allowed");
    if (v.length != 10) return showError("fPhone", "Mobile number must be 10 digits");
    if (!/^[6-9]/.test(v)) return showError("fPhone", "Indian mobile number starts with 6, 7, 8 or 9");
    return showError("fPhone", "");
}

function getAge(dob) {
    let birth = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    // birthday not come yet this year
    if (m < 0 || (m == 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function checkDob() {
    let v = value("fDob");
    if (v == "") return showError("fDob", "Date of birth is required");
    if (v > todayString()) return showError("fDob", "Date of birth cannot be in the future");
    let age = getAge(v);
    if (age < 18) return showError("fDob", "You must be at least 18 years old");
    if (age > 60) return showError("fDob", "Please check your date of birth");
    return showError("fDob", "");
}

function checkGender() {
    let g = document.querySelector("input[name='gender']:checked");
    if (g == null) return showError("fGender", "Please select gender");
    return showError("fGender", "");
}

function checkCity() {
    let v = value("fCity");
    if (v == "") return showError("fCity", "City is required");
    if (!/^[A-Za-z ]+$/.test(v) || v.length < 2) return showError("fCity", "Enter a valid city name");
    return showError("fCity", "");
}

function checkQual() {
    if (value("fQual") == "") return showError("fQual", "Please select your qualification");
    return showError("fQual", "");
}

function checkCollege() {
    let v = value("fCollege");
    if (v == "") return showError("fCollege", "College name is required");
    if (v.length < 3) return showError("fCollege", "College name is too short");
    return showError("fCollege", "");
}

function checkYear() {
    let v = value("fYear");
    if (v == "") return showError("fYear", "Passing year is required");
    let y = parseInt(v);
    let thisYear = new Date().getFullYear();
    if (isNaN(y) || v.length != 4 || y < 1990 || y > thisYear + 4) {
        return showError("fYear", "Enter a year between 1990 and " + (thisYear + 4));
    }
    return showError("fYear", "");
}

function checkCgpa() {
    let v = value("fCgpa");
    if (v == "") return showError("fCgpa", "CGPA is required");
    let c = parseFloat(v);
    if (isNaN(c) || c <= 0 || c > 10) return showError("fCgpa", "CGPA should be between 0 and 10");
    return showError("fCgpa", "");
}

function checkExp() {
    if (value("fExp") == "") return showError("fExp", "Please select your experience");
    return showError("fExp", "");
}

function checkLink() {
    let v = value("fLink");
    if (v == "") {
        // optional field, so empty is ok
        document.getElementById("fLink").classList.remove("invalid");
        document.getElementById("fLinkErr").innerHTML = "";
        return true;
    }
    if (!/^https?:\/\/[^\s]+\.[^\s]+$/.test(v)) return showError("fLink", "Link should start with http:// or https://");
    return showError("fLink", "");
}

function checkSkills() {
    let checked = document.querySelectorAll("input[name='skill']:checked");
    if (checked.length == 0) return showError("fSkills", "Select at least one skill");
    return showError("fSkills", "");
}

function checkResume() {
    let file = document.getElementById("fResume").files[0];
    if (file == undefined) return showError("fResume", "Please upload your resume");

    let name = file.name.toLowerCase();
    if (!(name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx"))) {
        return showError("fResume", "Only PDF or Word (.doc/.docx) files are allowed");
    }
    if (file.size > 2 * 1024 * 1024) {
        return showError("fResume", "File is too big. Max size is 2 MB");
    }
    return showError("fResume", "");
}

function updateCounter() {
    document.getElementById("coverCount").innerHTML = document.getElementById("fCover").value.length;
}

function checkCover() {
    let v = value("fCover");
    if (v == "") return showError("fCover", "Please write a few lines about yourself");
    if (v.length < 50) return showError("fCover", "Write at least 50 characters (" + v.length + " now)");
    return showError("fCover", "");
}

function checkSalary() {
    let v = value("fSalary");
    if (v == "") {
        document.getElementById("fSalary").classList.remove("invalid");
        document.getElementById("fSalaryErr").innerHTML = "";
        return true;
    }
    let s = parseInt(v);
    if (isNaN(s) || s < 1000 || s > 500000) return showError("fSalary", "Enter an amount between 1,000 and 5,00,000");
    return showError("fSalary", "");
}

function checkStart() {
    let v = value("fStart");
    if (v == "") return showError("fStart", "Please select a date");
    if (v < todayString()) return showError("fStart", "Date cannot be in the past");
    return showError("fStart", "");
}

function checkTerms() {
    if (!document.getElementById("fAgree").checked) return showError("fTerms", "Please confirm this to submit");
    return showError("fTerms", "");
}

function submitApplication(event) {
    event.preventDefault();   // stop page from reloading

    // check every field (not using && so that all errors show at once)
    let ok = true;
    if (!checkName()) ok = false;
    if (!checkEmail()) ok = false;
    if (!checkPhone()) ok = false;
    if (!checkDob()) ok = false;
    if (!checkGender()) ok = false;
    if (!checkCity()) ok = false;
    if (!checkQual()) ok = false;
    if (!checkCollege()) ok = false;
    if (!checkYear()) ok = false;
    if (!checkCgpa()) ok = false;
    if (!checkExp()) ok = false;
    if (!checkLink()) ok = false;
    if (!checkSkills()) ok = false;
    if (!checkResume()) ok = false;
    if (!checkCover()) ok = false;
    if (!checkSalary()) ok = false;
    if (!checkStart()) ok = false;
    if (!checkTerms()) ok = false;

    let msg = document.getElementById("formMsg");
    if (!ok) {
        msg.innerHTML = "Please fix the errors shown in red.";
        // go to the first wrong field
        document.querySelector(".invalid").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    // same email cannot apply twice for the same job
    let email = value("fEmail").toLowerCase();
    for (let i = 0; i < applications.length; i++) {
        if (applications[i].jobId == currentJob.id && applications[i].email == email) {
            msg.innerHTML = "You have already applied for this job with this email.";
            return;
        }
    }
    msg.innerHTML = "";

    let skills = [];
    let checked = document.querySelectorAll("input[name='skill']:checked");
    for (let i = 0; i < checked.length; i++) {
        skills.push(checked[i].value);
    }

    // application id like APP-2026-0001 (counter is kept separately so ids never repeat)
    let counter = parseInt(localStorage.getItem("chCounter") || "0") + 1;
    localStorage.setItem("chCounter", counter);
    let appId = "APP-" + new Date().getFullYear() + "-" + String(counter).padStart(4, "0");

    let app = {
        appId: appId,
        jobId: currentJob.id,
        name: value("fName"),
        email: email,
        phone: value("fPhone"),
        dob: value("fDob"),
        gender: document.querySelector("input[name='gender']:checked").value,
        city: value("fCity"),
        qualification: value("fQual"),
        college: value("fCollege"),
        year: value("fYear"),
        cgpa: value("fCgpa"),
        experience: value("fExp"),
        link: value("fLink"),
        skills: skills,
        otherSkills: value("fOther"),
        resume: document.getElementById("fResume").files[0].name,   // only the file name is stored
        cover: value("fCover"),
        salary: value("fSalary"),
        start: value("fStart"),
        appliedOn: todayString()
    };
    applications.push(app);
    saveAll();
    updateCounts();

    document.getElementById("successBox").innerHTML =
        "<div class='big-tick'>&#10004;</div>" +
        "<h2>Application Submitted!</h2>" +
        "<p class='small'>" + currentJob.title + " at " + currentJob.company + "</p>" +
        "<div class='app-id'>" + appId + "</div>" +
        "<p class='small'>Keep this ID for future reference.</p>" +
        "<div class='job-bottom' style='justify-content:center'>" +
        "<button class='btn' onclick=\"hideModal('successModal'); openPage('applied')\">My Applications</button>" +
        "<button class='btn outline' onclick=\"hideModal('successModal'); openPage('jobs')\">Browse More Jobs</button>" +
        "</div>";
    document.getElementById("successModal").classList.remove("hidden");
    resetForm();
}

function resetForm() {
    document.getElementById("appForm").reset();
    let marked = document.querySelectorAll("#appForm .valid, #appForm .invalid");
    for (let i = 0; i < marked.length; i++) {
        marked[i].classList.remove("valid");
        marked[i].classList.remove("invalid");
    }
    let errors = document.querySelectorAll("#appForm .err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].innerHTML = "";
    }
    document.getElementById("formMsg").innerHTML = "";
    updateCounter();
}


/* ================= my applications ================= */

function showApplications() {
    let html = "";

    // newest application first
    for (let i = applications.length - 1; i >= 0; i--) {
        let a = applications[i];
        let job = findJob(a.jobId);

        html += "<div class='app-card'>" +
            "<div class='app-head'>" +
            "<div class='job-top'><div class='job-logo'>" + job.logo + "</div>" +
            "<div><div class='job-title'>" + job.title + "</div><div class='company'>" + job.company + " &middot; " + job.location + "</div>" +
            "<div class='small'>" + a.appId + " &middot; Applied on " + niceDate(a.appliedOn) + "</div></div></div>" +
            "<span class='status'>Submitted</span>" +
            "</div>" +
            "<div class='app-details hidden' id='details-" + a.appId + "'>" +
            "<b>Name:</b> " + a.name + " &nbsp; <b>Email:</b> " + a.email + " &nbsp; <b>Mobile:</b> " + a.phone + "<br>" +
            "<b>Education:</b> " + a.qualification + ", " + clean(a.college) + " (" + a.year + "), CGPA " + a.cgpa + "<br>" +
            "<b>Experience:</b> " + a.experience + " &nbsp; <b>Skills:</b> " + a.skills.join(", ") +
            (a.otherSkills != "" ? ", " + clean(a.otherSkills) : "") + "<br>" +
            "<b>Resume:</b> " + clean(a.resume) + " &nbsp; <b>Can join from:</b> " + niceDate(a.start) + "<br>" +
            "<b>Cover letter:</b> " + clean(a.cover) +
            "</div>" +
            "<div class='app-btns'>" +
            "<button class='btn outline' onclick=\"toggleDetails('" + a.appId + "', this)\">View Details</button>" +
            "<button class='btn red' onclick=\"withdraw('" + a.appId + "')\">Withdraw</button>" +
            "</div>" +
            "</div>";
    }

    if (html == "") {
        html = "<div class='empty'>You have not applied for any job yet.<br><br>" +
            "<button class='btn' onclick=\"openPage('jobs')\">Browse Jobs</button></div>";
    }
    document.getElementById("appList").innerHTML = html;
}

function toggleDetails(appId, btn) {
    let box = document.getElementById("details-" + appId);
    box.classList.toggle("hidden");
    btn.innerHTML = box.classList.contains("hidden") ? "View Details" : "Hide Details";
}

function withdraw(appId) {
    if (!confirm("Withdraw application " + appId + "?")) return;

    let newList = [];
    for (let i = 0; i < applications.length; i++) {
        if (applications[i].appId != appId) {
            newList.push(applications[i]);
        }
    }
    applications = newList;
    saveAll();
    updateCounts();
    showApplications();
    toast("Application withdrawn");
}


/* ================= start ================= */
loadFilters();
updateCounts();
showJobs();
