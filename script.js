// Sample data for candidates
const candidates = [
    { name: 'Lulu', photo: 'images/lulu.png' },
    { name: 'Rifaz', photo: 'images/rifaz.png' },
    { name: 'Thooza', photo: 'images/thooza.png' }
];

// Initialize votes count
const votes = candidates.reduce((acc, candidate) => {
    acc[candidate.name] = 0;
    return acc;
}, {});

let chart = null;

function displayCandidates() {
    const candidatesDiv = document.getElementById('candidates');
    candidates.forEach(candidate => {
        const candidateDiv = document.createElement('div');
        candidateDiv.classList.add('candidate');
        candidateDiv.innerHTML = `
            <input type="radio" name="candidate" value="${candidate.name}">
            <img src="${candidate.photo}" alt="${candidate.name}">
            <span>${candidate.name}</span>
        `;
        candidatesDiv.appendChild(candidateDiv);
    });
}

function updateChart() {
    const ctx = document.getElementById('results-chart').getContext('2d');
    const candidateNames = candidates.map(candidate => candidate.name);
    const candidateVotes = candidateNames.map(name => votes[name]);

    if (chart) {
        chart.destroy(); // Destroy the existing chart before creating a new one
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: candidateNames,
            datasets: [{
                label: 'Number of Votes',
                data: candidateVotes,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function displayResults() {
    const resultsUl = document.getElementById('results');
    resultsUl.innerHTML = '';
    
    const totalVotes = Object.values(votes).reduce((acc, count) => acc + count, 0);
    const totalVoters = totalVotes; // Each vote corresponds to one voter

    // Update total voters count
    document.getElementById('total-voters').innerText = `Total Voters: ${totalVoters}`;

    candidates.forEach(candidate => {
        const li = document.createElement('li');
        const candidateVotes = votes[candidate.name];
        const percentage = totalVotes > 0 ? (candidateVotes / totalVotes * 100).toFixed(2) : 0;
        li.innerHTML = `
            <img src="${candidate.photo}" alt="${candidate.name}">
            <span>${candidate.name} - ${candidateVotes} votes (${percentage}%)</span>
        `;
        resultsUl.appendChild(li);
    });

    updateChart(); // Update the chart with new data
}

document.getElementById('submit-vote').addEventListener('click', () => {
    const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
    if (selectedCandidate) {
        votes[selectedCandidate.value]++;
        displayResults();
    } else {
        alert('Please select a candidate to vote for.');
    }
});

window.onload = () => {
    displayCandidates();
    displayResults();
};


