'use client'

import VerifyEmailFlow from "@/widgets/settings/email-verification-form";
import PasswordResetForm from "@/widgets/settings/password-reset-form";
import DeleteAccountForm from "@/widgets/settings/delete-account-form";
import {VerificationService} from "@/service/VerificationService";
import SecondPhaseForm from "@/widgets/settings/second-phase-form";
import {Settings} from "node:http2";
import {ISettings} from "@/entities";
import SetPasswordForm from "@/widgets/settings/set-password-form";

export function SecurityForm({settings}: {settings: ISettings}) {
    return (
        <div className="space-y-6">
            <VerifyEmailFlow sendOtp={VerificationService.verifyRequest} verifyOtp={VerificationService.checkOtp}/>
            {settings.passwordSet ? <PasswordResetForm /> : <SetPasswordForm />}
            <SecondPhaseForm />
            <DeleteAccountForm/>
        </div>
    );
}