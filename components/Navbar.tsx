import React from 'react'

function Navbar({ data }: { data: any }) {
    const homeProps = data
    return (
        <>
            <div className="navbar bg-base-100 border-b-2">
                <div className="navbar-start">
                    <a className="btn btn-ghost hover:bg-pink-300 hover:text-white normal-case text-xl font-bold">Gemoy</a>
                </div>
                {
                    homeProps == 'home' ? (
                        <div className="navbar-end">
                            <input type="text" placeholder="Search" className="input input-bordered" />
                        </div>

                    ) : null
                }
            </div>
        </>
    )
}

export default Navbar