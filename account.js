const email = sessionStorage.getItem("adminEmail");
if (!email) location.href = "login.html";
document.getElementById("accName").textContent =
  sessionStorage.getItem("adminName");
document.getElementById("accEmail").textContent = email;
document.getElementById("accPass").textContent =
  sessionStorage.getItem("adminPass");
Toastify({
  text: "✅ Account loaded!",
  duration: 3000,
  gravity: "top",
  position: "center",
  style: { background: "#2E7D32", color: "#fff", borderRadius: "4px" },
}).showToast();
function goBack() {
  history.back();
}
