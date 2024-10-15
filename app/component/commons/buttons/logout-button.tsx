"use client"

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import PrimaryButton from "./primary-button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import ConfirmDialog from "../dialog/confirm-dialog";


export default function LogoutButton() {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    return <>
        <PrimaryButton onClick={() => setShowConfirmDialog(true)} title="Log out" className="bg-orange-400" type="submit" size="sm" >
            <ArrowLeftStartOnRectangleIcon className="rotate-180" height={20} width={20} />
        </PrimaryButton>
        {showConfirmDialog && <ConfirmDialog
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={async () => { await signOut({ callbackUrl: '/login' }) }}
            icon={<ArrowLeftStartOnRectangleIcon className="rotate-180" height={60} width={60} />}
        >
            <p>You will be logged out. Are you sure?</p>
        </ConfirmDialog>}
    </>
}