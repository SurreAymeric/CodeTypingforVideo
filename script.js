document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('menu');
    var defaultButton = document.getElementById('theme-default');
    var darkButton = document.getElementById('theme-dark');
    var codeInput = document.getElementById('code-input');
    var codeOutput = document.getElementById('code-output').querySelector('code');
    var startButton = document.getElementById('start-button');
    var fullscreenButton = document.getElementById('fullscreen-button');
    var codeOutputContainer = document.querySelector('.code-output-container');
    var defaultTheme = 'prism-default.css';
    var darkTheme = 'prism-dark.css';
  
    var animationSpeed = 50; // Vitesse de l'animation en millisecondes
  
    function changeTheme(theme) {
      var linkElement = document.getElementById('prism-theme');
      linkElement.href = theme;
    }
  
    function animateCode() {
      var code = codeInput.value;
      var length = code.length;
      var currentIndex = 0;
  
      function appendCharacter() {
        if (currentIndex < length) {
          codeOutput.textContent += code[currentIndex];
          Prism.highlightElement(codeOutput);
          currentIndex++;
          setTimeout(appendCharacter, animationSpeed);
        }
      }
  
      codeOutput.textContent = '';
      appendCharacter();
    }
  
    startButton.addEventListener('click', animateCode);
  
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('show');
    });
  
    defaultButton.addEventListener('click', function() {
      changeTheme(defaultTheme);
      menu.classList.remove('show');
    });
  
    darkButton.addEventListener('click', function() {
      changeTheme(darkTheme);
      menu.classList.remove('show');
    });
  
    fullscreenButton.addEventListener('click', function() {
      toggleFullscreen();
    });
  
    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        if (codeOutputContainer.requestFullscreen) {
          codeOutputContainer.requestFullscreen();
        } else if (codeOutputContainer.mozRequestFullScreen) { // Firefox
          codeOutputContainer.mozRequestFullScreen();
        } else if (codeOutputContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
          codeOutputContainer.webkitRequestFullscreen();
        } else if (codeOutputContainer.msRequestFullscreen) { // IE/Edge
          codeOutputContainer.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen();
        }
      }
    }
  
    document.addEventListener('fullscreenchange', function() {
      if (document.fullscreenElement) {
        codeOutputContainer.classList.add('fullscreen');
      } else {
        codeOutputContainer.classList.remove('fullscreen');
      }
    });
  });
  