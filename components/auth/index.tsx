"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useRegisterModal from "@/hooks/useRegisterModal";
import RegisterModal from "../modals/register-modal";
import useLoaginModal from "@/hooks/useLoginModal";
import LoginModal from "../modals/login-modal";

export default function Auth() {
  const registerModal = useRegisterModal();
  const loginModal = useLoaginModal();

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <>
      <RegisterModal />
      <LoginModal />

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <Image
          src={"/images/x.svg"}
          width={450}
          height={450}
          alt="x-icon"
          className="justify-self-center hidden md:block"
        />
        <div className="flex flex-col  justify-center md:justify-between gap-6 h-full md:h-[70vh]">
          <div className="block md:hidden">
            <Image src={"/images/x.svg"} width={50} height={50} alt="x-icon" />
          </div>
          <h1 className="text-6xl font-bold">Happening now</h1>
          <div className="w-full md:w-[60%]">
            <h2 className="font-bold text-3xl mb-4">Join today.</h2>
            <div className="flex flex-col space-y-2">
              <Button
                label={
                  <div className="flex gap-2 items-center justify-center">
                    <FcGoogle />
                    Signup with Google
                  </div>
                }
                fullWidth
                secondary
              />
              <Button
                label={
                  <div className="flex gap-2 items-center justify-center">
                    <FaGithub />
                    Signup with GitHub
                  </div>
                }
                fullWidth
                secondary
              />
              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-700 w-1/2" />
                <p className="mx-4">or</p>
                <div className="h-px bg-gray-700 w-1/2" />
              </div>
              <Button
                label="Create account"
                fullWidth
                onClick={onOpenRegisterModal}
              />
              <div className="text-[10px] text-gray-400">
                By singning up, you agree to the
                <span className="text-sky-500"> Terms of Service </span> and
                <span className="text-sky-500"> Privacy Policy </span> ,
                including
                <span className="text-sky-500"> Cookie use </span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <h3 className="font-medium text-xl mb-4">
              Already have an account?
            </h3>
            <Button
              onClick={onOpenLoginModal}
              label="Sing in"
              fullWidth
              outline
            />
          </div>
        </div>
      </div>
    </>
  );
}
