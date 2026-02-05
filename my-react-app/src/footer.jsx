import React from "react";

function Footer()
 {
    return (
        <footer className="bg-black border-t border-cyan-400/30 mt-20">
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 text-sm text-gray-400">

                {/* Copyright */}
                <p>
                    © {new Date().getFullYear()} Your Brand. All rights reserved.
                </p>

                {/* Email */}
                <a
                    href="mailto:support@yourbrand.com"
                    className="hover:text-cyan-400 mt-2 md:mt-0">
                    support@yourbrand.com
                </a>

            </div>
        </footer>
    );
};

export default Footer;
