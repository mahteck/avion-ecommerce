"use server";

const handleSubmitForm = async (prevState: any, formData: FormData) => {
  try {
    const fields = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message || "Signup failed";
    }

    return data.message || "Signup successful";
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return error.message;
    } else {
      console.error("An unknown error occurred:", error);
      return "An unknown error occurred.";
    }
  }
};

export default handleSubmitForm;
