export async function getProfessors() {
  try {
    const response = await fetch(
      import.meta.env.VITE_REACT_BACKEND_URL + "/professors",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const professors = await response.json();
    return professors;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
