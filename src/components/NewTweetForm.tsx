import { useSession } from "next-auth/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";

function updateTextAreaSize(textarea: HTMLTextAreaElement) {
  if (textarea == null) return;
  textarea.style.height = "0";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback(
    (textarea: HTMLTextAreaElement) => {
      if (textarea == null) return;
      updateTextAreaSize(textarea);
      textareaRef.current = textarea;
    },
    [inputValue]
  );

  useLayoutEffect(() => {
    updateTextAreaSize(textareaRef.current!);
  }, [inputValue]);

  if (session.status !== "authenticated") return null;
  return (
    <div className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          onChange={(e) => setInputValue(e.target.value)}
          name=""
          id=""
          placeholder="What's happening?"
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
        ></textarea>
        <Button className="self-end">Tweet</Button>
      </div>
    </div>
  );
}

const NewTweetForm = () => {
  const session = useSession();
  if (session.status !== "authenticated") return null;
  return <Form />;
};

export default NewTweetForm;
