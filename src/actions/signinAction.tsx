"use server";

// import { redirect } from "next/navigation";
import * as jose from "jose";
import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

const handleSubmitForm = async (prevState: any, formData: FormData) => {
  try {
    const fields = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    // Post data to endpoint for login
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login-api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await response.json();

    // console.log("API Response:", data);  // Check API response

    // Return error message if request fails
    if (!response.ok) {
      // console.log(`Error: ${data.message}`);
      return data.message || "Login failed";
    }

    const user = data.user;
    // localStorage.setItem('userId', user._id); // Store userId in localStorage
    //console.log(user);

    // Payload stored in generated token
    const payload = {
      user,
      roles: ["admin", "customer"],
      permissions: {
        read: true,
        write: true,
      },
    };

    // console.log(`Secret Key: ${process.env.SECRET}`);

    if (!process.env.SECRET) {
      throw new Error("SECRET key is not defined in environment variables.");
    }

    // Generate JWT token
    const secret = new TextEncoder().encode(process.env.SECRET);
    const alg = "HS256";
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setSubject(user._id.toString())
      .setExpirationTime("1h") // JWT token timeout value
      .sign(secret);

    // Save token in cookie
    cookies().set("token", token, {
      expires: new Date(Date.now() + 1 * 60 * 1000), // Set cookie timeout value
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });

    // Save userid in cookie
    cookies().set("userId", user._id, {
      expires: new Date(Date.now() + 1 * 60 * 1000), // Set cookie timeout value
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });


    // redirect("/customer-dashboard");
    // return NextResponse.redirect("http://localhost:3000/admin-dashboard");
    // return { message: "Login successful", redirectUrl: "/admin-dashboard" };

    // Redirect based on role
    if (user.role === 'admin') {
      return { message: "Login successful", redirectUrl: "/admin-dashboard" };
    } else if (user.role === 'customer') {
      return { message: "Login successful", redirectUrl: "/customer-dashboard" };
    } else {
      return { message: "User role is not recognized", redirectUrl: null };
    }


  } catch (error) {
    if (error instanceof Error) {
      // console.error("Error:", error.message );
      return { message: error.message, redirectUrl: null };
      // return error.message;
    } else {
      // console.error("An unknown error occurred:", error);
      return { message: "An unknown error occurred.", redirectUrl: null };
      // return "An unknown error occurred.";
    }
  }
};

export default handleSubmitForm;
