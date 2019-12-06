function changeFontSize(target) {
    var size = document.getElementById("hover");
    var computedStyle = window.getComputedStyle
        ? getComputedStyle(hover)
        : demo.currentStyle; 
    var fontSize;
    if (computedStyle) {
        fontSize = parseFloat(computedStyle && computedStyle.fontSize);
        if (target == document.getElementById("button1")) {
            fontSize -= 5;
          } else if (target == document.getElementById("button2")) {
            fontSize += 5;
          }
          hover.style.fontSize = fontSize + "px";
    }
}