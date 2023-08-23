import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import useAuth from "../auth/hooks/useAuth"
import HeadingHome from "./components/HeadingHome"
import { InputSwitch } from "primereact/inputswitch";
const Profile = () => {
    const { auth, nameProfile, setNameProfile, handleSubmitUpdate } = useAuth()
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <>
            <HeadingHome heading={`Hello, ${auth.name}!`} />

            <div className="flex flex-col mt-8">
                <h2 className="font-semibold text-xl">Settings and Privacy of your profile:</h2>
                <form className='flex flex-col gap-6 w-[80%] xl:w-[75%] mx-auto justify-center h-full' onSubmit={(e) => handleSubmitUpdate(e, { password, newPassword, confirmPassword })}>

                    <div className="flex justify-end gap-3 items-center">
                        <p className="font-bold">Generate new password:</p>
                        <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                    </div>
                    <div className="field flex flex-col gap-2">
                        <label htmlFor="name" className="font-bold">
                            Name:
                        </label>
                        <InputText
                            id="name" name='name' value={nameProfile}
                            onChange={(e) => setNameProfile(e.target.value)}
                            required
                            placeholder='Your name...'
                        />
                    </div>
                    <blockquote className="grid grid-cols-2 gap-4">
                        <div className="field flex flex-col gap-2">
                            <label htmlFor="email" className="font-bold">
                                Email:
                            </label>
                            <InputText
                                id="email" name='email' value={auth.email}
                                type="email"
                                required
                                placeholder='Your email...'
                                disabled
                            />
                        </div>
                        <div className="field flex flex-col gap-2">
                            <label htmlFor="password" className="font-bold">
                                Password:
                            </label>
                            <InputText
                                id="password" name='password' value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Your password...'
                            />
                        </div>
                    </blockquote>
                    <div className="field flex flex-col gap-2">
                        <label htmlFor="newPassword" className="font-bold">
                            New Password:
                        </label>
                        <InputText
                            id="newPassword" name='newPassword' value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder='Your new password...'
                            disabled={!checked}
                        />
                    </div>
                    <div className="field flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="font-bold">
                            Confirm Password:
                        </label>
                        <InputText
                            id="confirmPassword" name='confirmPassword' value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder='Confirm new password...'
                            disabled={!checked}
                        />
                    </div>
                    <button
                        type='submit'
                        className='mt-2 p-3 rounded-md w-full bg-[#FEAF00] font-bold hover:transition-colors'
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default Profile
