document.getElementById("submit").addEventListener("click", fetchImage);
async function fetchImage(){
    const inputText = document.getElementById("url").value;
    try {
        const results = await fetch("/api/get_alt_tag?url=" + inputText);
        const resultHTML = await results.text();
        document.getElementById("img_result").innerHTML = resultHTML;
    } catch (err) {
        alert("Fetch failed: " + err);
    }
}