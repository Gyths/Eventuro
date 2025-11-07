export default function handleRoleNavigation(roles = [], organizerStatus, navigate) {
  if (roles.includes("ADMIN")) {
    navigate("/admin/dashboard");
  } else if (roles.includes("ORGANIZER")) {
    if (organizerStatus === "APPROVED") {
      navigate("/");
    } else {
      alert("Tu perfil de organizador está en revisión o pendiente de aprobación.");
      navigate("/");
    }
  } else {
    navigate("/");
  }
}
