import React from 'react'
import Typewriter from 'typewriter-effect';

export const Heading = () => {
  return (
    <div className="container px-12 py-16 mx-auto">
        <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg space-y-6">
                    <h1 className="text-6xl font-semibold text-gray-800 dark:text-white lg:text-6xl">Best place to choose your <br/>
                    <span className="text-blue-500 ">
                    <Typewriter
                        options={{
                          strings: ['Bank', 'Dreams', 'Goals'],
                          autoStart: true,
                          loop: true,
                          delay: 85, // Velocidad de escritura
                          cursor: "|",
                          cursorColor: "black",
                          pauseFor: 1000,
                          deleteSpeed: 40,
                        }}
                      />
                    </span>
                    </h1>
                    
                    <p className="mt-3 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>
                    
                    <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Create your user</button>
                </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <img className="w-full h-full lg:max-w-3xl" src="https://merakiui.com/images/components/Catalogue-pana.svg" alt="Catalogue-pana.svg"/>
            </div>
        </div>
    </div>
  )
}
