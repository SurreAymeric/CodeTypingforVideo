document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.getElementById('menu-toggle'); //lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
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

  var animationSpeed = 1;

  codeInput.addEventListener('input', () => {
    codeInput.scrollTop = codeInput.scrollHeight;
  });

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
    
        // Faire défiler automatiquement vers la dernière ligne
        var codeOutputHeight = codeOutputContainer.offsetHeight;
        var codeOutputScrollHeight = codeOutputContainer.scrollHeight;
        if (codeOutputScrollHeight > codeOutputHeight) {
          codeOutputContainer.scrollTop = codeOutputScrollHeight - codeOutputHeight;
        }
    
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
      } else if (codeOutputContainer.mozRequestFullScreen) {
        codeOutputContainer.mozRequestFullScreen();
      } else if (codeOutputContainer.webkitRequestFullscreen) {
        codeOutputContainer.webkitRequestFullscreen();
      } else if (codeOutputContainer.msRequestFullscreen) {
        codeOutputContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
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
