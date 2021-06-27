let count = 0;

document.querySelector("#filter-jobs")
.addEventListener("change", () => {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs =>{
        let filteredJobs = filterJobs(jobs, text)
        let showCount = document.querySelector(".showCount");
        showCount.innerHTML = count
        showJobs(filteredJobs)
    })
})

let dayNightMode = document.querySelector(".switch")
dayNightMode.addEventListener("click", () =>{
      dayNightMode.classList.toggle("day-switch")
      let body = document.querySelector("body")
      body.classList.toggle("day-mode")
    }
)

function getJobs(){
    return fetch("data.json")
    .then(response => response.json())
    .then(data => {
        return data
    })
}

function filterJobs(jobs, searchText){
    if(searchText){
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText)
               || job.type.toLowerCase().includes(searchText)
               || job.company.toLowerCase().includes(searchText)
               || job.requirements.content.toLowerCase().includes(searchText)){
                   return true
               } 
             else{
                   return false;
             }  
        })
        return filteredJobs
    }
    else{
        return jobs
    }
}

function showJobs(jobs){
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    jobs.forEach(job => {
        count++;
        jobsHTML += `<div class="job-tile">
        <div class="top">
            <img src="${job.logo}"/>
        </div>
        <div class="rolename">
            <span>${job.roleName}</span>
        </div>
        <div class="description">
            <span>${job.requirements.content}</span>
        </div>
        <div class="buttons">
            <div class="button apply-now">
                Apply Now
            </div>
            <div class="button">
                Message
            </div>
        </div>
    </div>
`
    })
    let showCount = document.querySelector(".showCount");
    showCount.innerHTML = count
    
    count = 0

    jobsContainer.innerHTML = jobsHTML
}

getJobs().then(data => {
    showJobs(data);
});