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
        if (usernameInput === "") {
            document.getElementById("error-message").innerText = "Please enter your name.";
            return;
        } else if (usernameInput !== "Firdose Ara" && usernameInput !== "Mohammed Zeeshan") {
            document.getElementById("error-message").innerText = "Invalid username! Please enter Firdose Ara or Zeeshan.";
            return;
        }
        currentUser = usernameInput;
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("tracker-section").classList.remove("hidden");
        document.getElementById("welcome-message").innerText = `Welcome, ${currentUser}! Track your reading progress.`;
        updateUI();
    }

    function addBook() {
        const bookTitle = document.getElementById("book-title").value.trim();
        if (bookTitle === "") {
            document.getElementById("error-message").innerText = "Please enter a book title.";
            return;
        }
        storedBooks[currentUser].push(bookTitle);
        localStorage.setItem("books", JSON.stringify(storedBooks));
        updateUI();
        document.getElementById("book-title").value = "";
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
                `📖 ${otherUser} might need a map to find where you are - ${difference} books ahead! 🗺️`,
                `🧠 Your brain is ${difference} books bigger than ${otherUser}'s! Keep feeding it! 🍽️`,
                `🏆 ${otherUser} called - they want their ${difference} book deficit back! Too bad! 😎`,
                `🚴 You're pedaling through books while ${otherUser} is still looking for their helmet! 🚲`,
                `🧙 You're ${difference} books ahead - clearly you've discovered the secret to time magic! ⏳`,
                `🍿 ${otherUser} is binge-watching while you're binge-reading! ${difference} books ahead! 🎬`,
                `👑 ${difference} books ahead? Someone crown this reading royalty! 👑`,
                `🤓 Nerd alert! You're ${difference} books nerdier than ${otherUser}! 📚`,
                `💨 ${otherUser} is eating your dust! ${difference} books worth! 🏎️`,
                `🧐 ${difference} books ahead? Someone's been skipping social events! 🎭`,
                `🤯 ${otherUser}'s mind is blown by your ${difference} book lead! 💥`,
                `🦄 A ${difference}-book lead? That's almost as rare as a unicorn! 🦄`,
                `💕 Your love for books is ${difference} times stronger than ${otherUser}'s! So romantic! 📖❤️`,
                `🌹 ${difference} more books read? ${otherUser} must find your intellect irresistible! 💘`,
                `💌 The way you devour books is ${difference} times more passionate than ${otherUser}! 📚😍`
            ];
            message = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        } else if (userCount < otherUserCount) {
            let funnyMessages = [
                `📚 You are ${difference} book(s) behind ${otherUser}. Catch up fast and show them who's boss! 💪`,
                `😱 Uh-oh, ${otherUser} is ahead by ${difference} book(s). Time to speed up your reading! 🏃`,
                `🚨 Don't let ${otherUser} win! You're behind by ${difference} book(s). Grab a book now! 📖`,
                `🐌 Moving a bit slow there! ${otherUser} is ${difference} books ahead. Time to switch to turbo mode! 🚀`,
                `🛋️ Less Netflix, more books! ${otherUser} is winning by ${difference}! 📚`,
                `🎮 Put down that controller! ${otherUser} is ${difference} books ahead! Time to level up your reading! 📖`,
                `🍩 Donut worry, just read! ${otherUser} is ${difference} books ahead! 🍪`,
                `🦥 ${otherUser} is ${difference} books ahead - are you reading or hibernating? 🌿`,
                `📱 Maybe put down the phone? ${otherUser} is ${difference} books ahead! 📵`,
                `🛌 Wakey wakey! ${otherUser} is ${difference} books ahead! ☕`,
                `🎲 ${otherUser} rolled a ${difference} on their reading advantage! Time to roll better! 🎯`,
                `😬 ${difference} books behind? Yikes... maybe stop pretending you're reading? 🤥`,
                `🤡 ${otherUser} is ${difference} books ahead - is this a joke? Oh wait... 😅`,
                `🙈 ${difference} books behind? Maybe if you stop watching cat videos... 🐱`,
                `🍕 Less pizza, more pages! ${otherUser} is ${difference} ahead! 🍕`,
                `💤 ${difference} books behind? Someone's been napping instead of reading! 😴`,
                `🤦 ${otherUser} is ${difference} books ahead - this is getting embarrassing! 🙈`,
                `💘 ${otherUser} is ${difference} books ahead - maybe they're trying to impress you? 😘`,
                `🌙 ${difference} books behind? Late night reading dates with ${otherUser} might help! 🌠`,
                `💝 The bookworm in you loves ${otherUser} ${difference} times more now! 📚💞`
            ];
            message = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        } else {
            let tieMessages = [
                `🤼 You and ${otherUser} are neck and neck! Keep the competition alive! 🔥`,
                `⚖️ Perfect balance! Both at ${userCount} books. Who will break the tie? 🤔`,
                `🎭 It's a literary standoff! Who will read the next book first? 📚`,
                `🎪 The ultimate showdown! ${userCount} books each! 🎯`,
                `👯 Book twins! ${userCount} books each! Who will blink first? 👀`,
                `🤝 A reading truce! Both at ${userCount} books. For now... ⏳`,
                `🏁 Photo finish! ${userCount} books each! The race continues... 🏎️`,
                `🕺💃 Reading dance-off! ${userCount} books each! Who's got the moves? 📖`,
                `😏 ${userCount} books each? Someone's clearly copying someone... 🤨`,
                `🤪 Tied at ${userCount}? This is getting ridiculous! In a good way! 😜`,
                `🃏 ${userCount} books each? The house always wins! 🎰`,
                `🤷 ${userCount} books each? Well this is awkward... 😅`,
                `👀 ${userCount} books each? The tension is palpable! 🍿`,
                `💞 Perfectly matched at ${userCount} books - it's like you're soulmates! 💑`,
                `🌹 ${userCount} books each? This intellectual connection is blooming! 🌷`,
                `💕 Your reading harmony with ${otherUser} is ${userCount} books strong! 📚❤️`
            ];
            message = tieMessages[Math.floor(Math.random() * tieMessages.length)];
        }

        document.getElementById("comparison-text").innerText = message;
    }

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

    document.getElementById("username").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            authenticateUser();
        }
    });
});
