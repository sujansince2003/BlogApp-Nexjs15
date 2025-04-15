"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-600"
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default SubmitButton;
