String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

(function (window) {
  var OSName = OSDetect();

  if (OSName != "unknown") {
    var button = document.getElementById("download_button");
    button.innerText = button.innerText.replace("Download","Download for "+OSName.capitalize());
    button.href = button.href+"/#"+OSName;
    var other_platform = document.getElementById("platform_button");
    other_platform.style.display = "inline-block";
  }
}(this));
