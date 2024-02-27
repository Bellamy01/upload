import { useState } from "react"

export default function Login() {
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    });

    return (
        <div className="flex flex-col gap-4 items-center justify-left px-6 bg-orange-50 py-24">
            <h3 className="uppercase font-semibold text-2xl text-main flex gap-1">
                {formState.login ? 'Login' : 'Signup'}<p className="">to <span className="italic font-bold">Upload</span></p>
            </h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    // createLink()
                }}
                className="w-1/2"
                autoComplete="off"
            >
                {!formState.login && (
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                            required
                            value={formState.name}
                            placeholder=""
                            onChange={(e) => setFormState({
                                ...formState,
                                name: e.target.value
                            })} />
                        <label
                            htmlFor="floating_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                )}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        required
                        value={formState.email}
                        placeholder=""
                        onChange={(e) => setFormState({
                            ...formState,
                            email: e.target.value
                        })} />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        placeholder=""
                        required
                        value={formState.password}
                        type="password"
                        onChange={(e) => setFormState({
                            ...formState,
                            password: e.target.value
                        })}
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="submit" className="text-white bg-main hover:bg-main/60 focus:ring-4 uppercase focus:outline-none focus:ring-main/20 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    {formState.login ? 'Login' : 'Signup'}
                </button>
                <div className="text-sm mt-2 flex gap-2 items-center justify-start">
                    <p>{formState.login ? 'need to create an account?' : 'have an account?'}</p>
                    <button className="text-main underline" onClick={() => setFormState({
                        ...formState,
                        login: !formState.login,
                    })}>Click here</button>
                </div>
            </form>
        </div>
    )
}
