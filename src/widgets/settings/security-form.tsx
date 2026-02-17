'use client'

import VerifyEmailFlow from "@/widgets/settings/email-verification-form";
import PasswordResetForm from "@/widgets/settings/password-reset-form";
import DeleteAccountForm from "@/widgets/settings/delete-account-form";
import {VerificationService} from "@/service/VerificationService";

export function SecurityForm() {
    return (
        <div className="space-y-6">
            <VerifyEmailFlow sendOtp={VerificationService.verifyRequest} verifyOtp={VerificationService.checkOtp}/>
            <PasswordResetForm/>
            <DeleteAccountForm/>
        </div>
    );
}