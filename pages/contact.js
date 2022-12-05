import Container from "@components/container";
import Layout from "@components/layout";
import { getClient } from "@lib/sanity";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "use-web3forms";
import { configQuery } from "@lib/groq";
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon
} from "@heroicons/react/outline";
export default function Contact({ siteconfig }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm({
    mode: "onTouched"
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  // Please update the Access Key in the Sanity CMS - Site Congig Page
  const apiKey = siteconfig?.w3ckey || "skmSFbEpvYc3cvaL3nv0MM9gpYwLmrX4StVamV3w2hrZGhOggNxicezJsU5o1tSrdPamEfcGeueCfXHJXzOmIjKncePppS1U84ep2e2lii2Z8TbKVrK1iijAU4dWbINpC6HZELmFgmrhIOA4Px5pZciRIUFQyGSN9EfjfTkxvqWQKGTsR0SP";

  const { submit: onSubmit } = useWeb3Forms({
    apikey: apiKey,
    from_name: "Elie Valdez",
    subject: "New Contact Message from Elie's Blogsite",
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    }
  });

  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          Contact
        </h1>
        <div className="text-center">
          <p className="text-lg">Feel free to message me anytime!</p>
        </div>

        <div className="grid my-10 md:grid-cols-2">
          <div className="my-10">
            <h2 className="text-2xl font-semibold dark:text-white">
              Contact Elie 
            </h2>
            <p className="max-w-sm mt-5">
              Wish to add or comment about something?
              Shoot me a email and I will do my best to get back in a timely manner.
            </p>

            <div className="mt-5">
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <LocationMarkerIcon className="w-4 h-4" />
                <span>175 N Wayfield St, Orange, CA 92867</span>
              </div>
              {siteconfig?.email && (
                <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                  <MailIcon className="w-4 h-4" />
                  <a href={`mailto:${siteconfig.email}`}>
                    {siteconfig.email}
                  </a>
                </div>
              )}
              {siteconfig?.phone && (
                <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                  <PhoneIcon className="w-4 h-4" />
                  <a href={`tel:${siteconfig.phone}`}>
                    {siteconfig.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="my-10">
              <input
                type="checkbox"
                id=""
                className="hidden"
                style={{ display: "none" }}
                {...register("botcheck")}></input>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="false"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${
                    errors.name
                      ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                  }`}
                  {...register("name", {
                    required: "Full name is required",
                    maxLength: 80
                  })}
                />
                {errors.name && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.name.message}</small>
                  </div>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="email_address" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email_address"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="false"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${
                    errors.email
                      ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                  }`}
                  {...register("email", {
                    required: "Enter your email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email"
                    }
                  })}
                />
                {errors.email && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.email.message}</small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900   rounded-md outline-none  h-36 focus:ring-4  ${
                    errors.message
                      ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                  }`}
                  {...register("message", {
                    required: "Enter your Message"
                  })}
                />
                {errors.message && (
                  <div className="mt-1 text-red-600">
                    {" "}
                    <small>{errors.message.message}</small>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">
                {isSubmitting ? (
                  <svg
                    className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {isSubmitSuccessful && isSuccess && (
              <div className="mt-3 text-sm text-center text-green-500">
                {message || "Success. Message sent successfully"}
              </div>
            )}
            {isSubmitSuccessful && !isSuccess && (
              <div className="mt-3 text-sm text-center text-red-500">
                {message || "Something went wrong. Please try later."}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
