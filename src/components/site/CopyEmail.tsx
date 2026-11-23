import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function CopyEmail({ variant = "soft", size = "xl" }: Pick<ButtonProps, "variant" | "size">) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant={variant}
      size={size}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
        } catch {
          /* clipboard blocked — still show the address */
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      aria-live="polite"
    >
      {copied ? <Check /> : <Copy />}
      {copied ? "已複製 Email！" : profile.email}
    </Button>
  );
}
