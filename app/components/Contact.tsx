"use client"

import React, { useRef, FormEvent } from 'react'

const Contact: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Do something here
  }

  return (
    <div className='bg-[#00044d]'>
      <svg className="wave-top" viewBox="0 0 1439 147" version="1.1">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
            <g className="wave" fill="white">
              <path
                d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
              ></path>
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.1"></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.1"
                ></path>
                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.2"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>

      <div className="relative mx-auto w-full max-w-7xl py-20">
        <div className="grid grid-cols-2">
          {/* CONTACT FORM CONTAINER */}
          <div className="order-3 md:order-2 col-span-full md:col-span-1 py-5 md:py-10 px-6">
            <form action="" className="mx-auto max-w-xl space-y-4" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                {/* label */}
                <label htmlFor="name" className="sr-only"> Name </label>
                {/* input */}
                <input ref={nameRef} type="text" id="name" name="name"
                  placeholder="Nume"
                  className="bg-gray-900 pl-3 py-1 form-input w-full block shadow-sm rounded border-gray-700 text-base placeholder-gray-600 text-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                />
              </div>

              {/* Email Input */}
              <div>
                {/* label */}
                <label htmlFor="email" className="sr-only">Email</label>
                {/* input */}
                <input ref={emailRef} type="email" id="email" name="email"
                  placeholder="Adresa de email"
                  className="bg-gray-900 pl-3 py-1 form-input w-full block shadow-sm rounded border-gray-700 text-base placeholder-gray-600 text-gray-600 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                />
              </div>
              {/* Message Input */}
              <div className="col-span-full">
                {/* label */}
                <label htmlFor="message" className="sr-only">Message</label>
                {/* input */}
                <textarea ref={messageRef} name="message" id="message" cols={30} rows={4}
                  placeholder="Cum te putem ajuta?"
                  className="bg-gray-900 pl-3 py-1 form-textarea resize-none w-full shadow-sm rounded border-gray-700 placeholder-gray-600 text-gray-600 focus:border-green-400 focus:ring-green-400"
                ></textarea>
              </div>
              {/* ::Submit Button */}
              <div>
                <button type="submit" className="py-2 px-6 rounded bg-orange-500 text-base text-white font-semibold uppercase hover:bg-indigo-500">Trimite mesaj</button>
              </div>
            </form>
          </div>

          {/* :CONTACT INFOS CONTAINER */}
          <div className="font-poppins order-2 md:order-3 col-span-full md:col-span-1 py-5 md:py-10 px-6">
            <div className="mx-auto max-w-xl flex flex-col space-y-5">
              {/* ::Title Contact Us */}
              <h2 className="text-4xl font-quicksand font-semibold text-gray-200 uppercase">Contact</h2>
              {/* ::Text */}
              <p className="text-sm text-gray-500">
                Ne-ar face placere să auzim de la tine! Dacă ai întrebări, sugestii sau feedback pentru noi, nu ezita să ne contactezi prin intermediul formularului de contact. Vom încerca să îți răspundem cât mai curând posibil. Mulțumim pentru interesul acordat blogului nostru.
              </p>
              {/* ::Email contact */}
              <a href="mailto:codewiki.blog@gmail.com" className="inline-flex items-center text-base text-blue-400 font-semibold hover:text-orange-500">
                codewiki.blog@gmail.com
              </a>
              {/* ::Address */}
              {/* ::Socials */}
              <div className="flex items-center space-x-3">
                {/* :Twitter */}
                <a href="#twitter" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#1DA1F2] text-white filter hover:brightness-125">
                  {/* ::twitter svg */}
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.724 0-4.932 2.208-4.932 4.917 0 .39.045.765.127 1.124-4.094-.205-7.725-2.165-10.148-5.144-.424.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.11-.849.171-1.296.171-.314 0-.626-.03-.927-.086.631 1.953 2.445 3.377 4.6 3.416-1.68 1.319-3.809 2.105-6.115 2.105-.398 0-.79-.023-1.17-.067 2.179 1.396 4.768 2.212 7.557 2.212 9.142 0 14.307-7.721 14.307-14.426 0-.22-.005-.439-.014-.653.98-.71 1.8-1.6 2.46-2.612z" />
                  </svg>
                </a>
                {/* :Facebook */}
                <a href="#facebook" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#1877F2] text-white filter hover:brightness-125">
                  {/* ::facebook svg */}
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.734 0-1.325.591-1.325 1.324v21.351c0 .733.591 1.325 1.325 1.325h11.495v-9.293h-3.125v-3.622h3.125v-2.671c0-3.1 1.894-4.787 4.659-4.787 1.325 0 2.462.099 2.794.142v3.24l-1.917.001c-1.504 0-1.795.715-1.795 1.764v2.311h3.587l-.467 3.622h-3.12v9.293h6.116c.733 0 1.325-.592 1.325-1.325v-21.35c0-.733-.592-1.324-1.325-1.324z" />
                  </svg>
                </a>
                {/* :Instagram */}
                <a href="https://www.instagram.com/codewiki.ro/" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#E4405F] text-white filter hover:brightness-125">
                  {/* ::instagram svg */}
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.851s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.851.069-3.204 0-3.584-.012-4.85-.07-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.851s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.975 2.242-1.246 3.608-1.308 1.266-.057 1.646-.069 4.85-.069m0-2.163c-3.259 0-3.667.014-4.947.072-1.273.058-2.55.334-3.512 1.297-.961.961-1.238 2.239-1.296 3.512-.059 1.28-.073 1.688-.073 4.947s.014 3.667.072 4.947c.058 1.273.334 2.55 1.296 3.512.961.961 2.239 1.238 3.512 1.296 1.28.059 1.688.073 4.947.073s3.667-.014 4.947-.072c1.273-.058 2.55-.334 3.512-1.296.961-.961 1.238-2.239 1.296-3.512.059-1.28.073-1.688.073-4.947s-.014-3.667-.072-4.947c-.058-1.273-.334-2.55-1.296-3.512-.961-.961-2.239-1.238-3.512-1.296-1.28-.059-1.688-.073-4.947-.073z" />
                  </svg>
                </a>
                {/* :Linkedin */}
                <a href="https://www.linkedin.com/company/codewiki/" className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#0077B5] text-white filter hover:brightness-125">
                  {/* ::linkedin svg */}
                  <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M22.23 0h-20.46c-.974 0-1.77.795-1.77 1.77v20.459c0 .974.796 1.771 1.77 1.771h20.46c.974 0 1.77-.797 1.77-1.771v-20.459c0-.975-.796-1.77-1.77-1.77zm-13.538 20.452h-3.077v-10.677h3.077v10.677zm-1.538-12.153c-.987 0-1.789-.801-1.789-1.788s.802-1.789 1.789-1.789 1.789.801 1.789 1.789-.802 1.788-1.789 1.788zm12.153 12.153h-3.077v-5.802c0-1.383-.025-3.163-1.929-3.163-1.929 0-2.225 1.507-2.225 3.058v5.907h-3.077v-10.677h2.951v1.462h.041c.411-.781 1.413-1.604 2.91-1.604 3.106 0 3.68 2.045 3.68 4.705v6.114z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
