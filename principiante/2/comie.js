const video = document.getElementById('video-background');
        const nextButton = document.getElementById('next-button');
        const socialLinks = document.getElementById('social-links');


        video.addEventListener('ended', () => {
            video.currentTime = video.duration; 
            nextButton.style.display = 'block'; 
            socialLinks.style.display = 'block'; 
        });