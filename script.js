document.getElementById("upload").addEventListener("change", function () {
  let file = this.files[0];
  if (!file) return;

  let formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "YOUR_API_KEY_HERE" },
    body: formData,
  })
    .then((res) => res.blob())
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      let img = document.getElementById("output");
      img.src = url;
      img.style.display = "block";

      let downloadBtn = document.getElementById("download");
      downloadBtn.style.display = "inline-block";

      downloadBtn.onclick = () => {
        let a = document.createElement("a");
        a.href = url;
        a.download = "no-bg.png";
        a.click();
      };
    })
    .catch((err) => alert("Error: " + err));
});
