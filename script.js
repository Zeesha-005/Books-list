document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('myVideo');
    video.addEventListener('error', function() {
        document.body.style.background = 'linear-gradient(-45deg, #2c3e50, #34495e, #1e1e1e, #2c3e50)';
        document.body.style.backgroundSize = '400% 400%';
        document.body.style.animation = 'gradientBG 10s ease infinite';
    });

    video.addEventListener('loadeddata', function() {
        document.body.classList.add('video-loaded');
    });

    const storedBooks = JSON.parse(localStorage.getItem("books")) || { "Firdose Ara": [], "Zeeshan": [] };
    let currentUser = "";
    
    function authenticateUser() {
        const usernameInput = document.getElementById("username").value.trim();
        if (usernameInput === "Firdose Ara" || usernameInput === "Zeeshan") {
            currentUser = usernameInput;
            document.getElementById("login-section").classList.add("hidden");
            document.getElementById("tracker-section").classList.remove("hidden");
            document.getElementById("welcome-message").innerText = `Welcome, ${currentUser}! Track your reading progress.`;
            updateUI();
        } else {
            document.getElementById("error-message").innerText = "Invalid username! Please enter Firdose Ara or Zeeshan.";
        }
    }

    function addBook() {
        const bookTitle = document.getElementById("book-title").value.trim();
        if (bookTitle) {
            storedBooks[currentUser].push(bookTitle);
            localStorage.setItem("books", JSON.stringify(storedBooks));
            updateUI();
            document.getElementById("book-title").value = "";
        }
    }

    function updateUI() {
        const otherUser = currentUser === "Firdose Ara" ? "Zeeshan" : "Firdose Ara";
        document.getElementById("other-user-heading").innerText = `${otherUser}'s Books`;

        const userBooksList = document.getElementById("user-books-list");
        const otherUserBooksList = document.getElementById("other-user-books-list");
        const userBooksCounter = document.getElementById("user-books-counter");
        const otherBooksCounter = document.getElementById("other-books-counter");

        userBooksList.innerHTML = "";
        otherUserBooksList.innerHTML = "";

        storedBooks[currentUser].forEach(book => {
            const li = document.createElement("li");
            li.innerText = book;
            userBooksList.appendChild(li);
        });

        storedBooks[otherUser].forEach(book => {
            const li = document.createElement("li");
            li.innerText = book;
            otherUserBooksList.appendChild(li);
        });

        userBooksCounter.innerText = `Total Books: ${storedBooks[currentUser].length}`;
        otherBooksCounter.innerText = `Total Books: ${storedBooks[otherUser].length}`;

        compareBooks(currentUser, otherUser);
    }
        // ... existing code ...
    
        function compareBooks(user, otherUser) {
            let userCount = storedBooks[user].length;
            let otherUserCount = storedBooks[otherUser].length;
            let difference = Math.abs(userCount - otherUserCount);
            let message = "";
    
            if (userCount > otherUserCount) {
                let funnyMessages = [
                    `📚 You have read ${difference} more book(s) than ${otherUser}. Keep going, genius! 🧠`,
                    `🚀 Wow, ${otherUser} is falling behind! You are ${difference} books ahead. Stay unstoppable! 💪`,
                    `🏃 Looks like ${otherUser} needs to step up. You are winning by ${difference} book(s)! 🏆`,
                    `🎯 You're on fire! ${difference} books ahead of ${otherUser}. They can't catch you! 🔥`,
                    `🦸 Look at you go! ${difference} books ahead - you're basically a reading superhero! ⚡`,
                    `📖 ${otherUser} might need a map to find where you are - ${difference} books ahead! 🗺️`
                ];
                message = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            } else if (userCount < otherUserCount) {
                let funnyMessages = [
                    `📚 You are ${difference} book(s) behind ${otherUser}. Catch up fast and show them who's boss! 💪`,
                    `😱 Uh-oh, ${otherUser} is ahead by ${difference} book(s). Time to speed up your reading! 🏃`,
                    `🚨 Don't let ${otherUser} win! You're behind by ${difference} book(s). Grab a book now! 📖`,
                    `🐌 Moving a bit slow there! ${otherUser} is ${difference} books ahead. Time to switch to turbo mode! 🚀`,
                    `🛋️ Less Netflix, more books! ${otherUser} is winning by ${difference}! 📚`,
                    `🎮 Put down that controller! ${otherUser} is ${difference} books ahead! Time to level up your reading! 📖`
                ];
                message = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            } else {
                let tieMessages = [
                    `🤼 You and ${otherUser} are neck and neck! Keep the competition alive! 🔥`,
                    `⚖️ Perfect balance! Both at ${userCount} books. Who will break the tie? 🤔`,
                    `🎭 It's a literary standoff! Who will read the next book first? 📚`,
                    `🎪 The ultimate showdown! ${userCount} books each! 🎯`
                ];
                message = tieMessages[Math.floor(Math.random() * tieMessages.length)];
            }
    
            document.getElementById("comparison-text").innerText = message;
        }
    
        // ... existing code ...
    function goHome() {
        currentUser = "";  // Reset current user
        document.getElementById("login-section").classList.remove("hidden");
        document.getElementById("tracker-section").classList.add("hidden");
        document.getElementById("username").value = "";
        document.getElementById("error-message").innerText = "";
    }
    document.getElementById("home-button").addEventListener("click", goHome);

    

    document.querySelector("button").addEventListener("click", authenticateUser);
    document.getElementById("book-title").addEventListener("keypress", (event) => {
        if (event.key === "Enter") addBook();
    });

    // Add this new event listener for the username input
    document.getElementById("username").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            authenticateUser();
        }
    });
});
