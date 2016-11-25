function OSDetect(){
  var OSName = "unknown";
  if (window.navigator.userAgent.indexOf("Windows") != -1) OSName="windows";
  if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="mac";
  if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="unix";
  if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="linux";
  return OSName;
}
