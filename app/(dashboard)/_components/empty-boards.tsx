"use client";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "../../../hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyBaords = () => {
const router = useRouter();
const {organization} = useOrganization();
const {mutate,pending} = useApiMutation(api.board.create);

const onClick = () => {
   if(!organization) return;

   mutate({
      orgId: organization.id,
      title: "Untitled"
   })
      .then((id) => {
         toast.success("Board created");
         router.push(`/board/${id}`);
      })
      .catch(()=> {
         toast.error("Failed to create board")
      })
};

   return (
    <div className="mr-20 h-full flex flex-col items-center justify-center">
        <Image
         src= "/notes.svg"
         height={250}
         width={250}
         alt="Empty"
         />
         <h2 className="text-2xl font-semibold mt-6">
            Create your first board
         </h2>
         <p className="text-muted-foreground textg-sm mt-2">
            Start by creating a board for your organization
         </p>
         <div className="mt-6">
            <Button disabled = {pending} onClick = {onClick} size = "lg">
               Create Board
            </Button>
         </div>
    </div>
 );
};