document.addEventListener('DOMContentLoaded', () => {
    // Check if vote counts already exist in local storage
    const candidate1Votes = parseInt(localStorage.getItem('candidate1Votes') || 0);
    const candidate2Votes = parseInt(localStorage.getItem('candidate2Votes') || 0);
    const candidate3Votes = parseInt(localStorage.getItem('candidate3Votes') || 0);

    // Update vote counts and total voters on page load
    const totalVoters = candidate1Votes + candidate2Votes + candidate3Votes;
    document.getElementById('total-voters').innerText = totalVoters;
    document.getElementById('candidate1-votes').innerText = candidate1Votes;
    document.getElementById('candidate2-votes').innerText = candidate2Votes;
    document.getElementById('candidate3-votes').innerText = candidate3Votes;

    // Handle form submission
    document.getElementById('vote-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedCandidate = document.querySelector('input[name="vote"]:checked');
        if (selectedCandidate) {
            const candidate = selectedCandidate.value;

            // Update the vote count for the selected candidate
            let newVotes;
            if (candidate === 'Candidate 1') {
                newVotes = candidate1Votes + 1;
                localStorage.setItem('candidate1Votes', newVotes);
                document.getElementById('candidate1-votes').innerText = newVotes;
            } else if (candidate === 'Candidate 2') {
                newVotes = candidate2Votes + 1;
                localStorage.setItem('candidate2Votes', newVotes);
                document.getElementById('candidate2-votes').innerText = newVotes;
            } else if (candidate === 'Candidate 3') {
                newVotes = candidate3Votes + 1;
                localStorage.setItem('candidate3Votes', newVotes);
                document.getElementById('candidate3-votes').innerText = newVotes;
            }

            // Update total voters
            const updatedTotalVoters = totalVoters + 1;
            document.getElementById('total-voters').innerText = updatedTotalVoters;
            localStorage.setItem('totalVoters', updatedTotalVoters);

            // Hide the voting form
            document.getElementById('vote-form').style.display = 'none';
            document.getElementById('thank-you').style.display = 'block';

            // Delay showing the results
            setTimeout(() => {
                document.getElementById('results').style.display = 'block';
            }, 2000); // 2000 milliseconds = 2 seconds
        } else {
            alert('Please select a candidate before voting.');
        }
    });
});
