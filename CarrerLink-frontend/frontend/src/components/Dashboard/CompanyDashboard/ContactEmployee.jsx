import React from 'react'
import {Mail,Phone,MessageSquare} from 'lucide-react'
import {Linkedin} from 'lucide-react'
function ContactEmployee({ company }) {
  return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">{company?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">{company?.mobile}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="font-medium">LinkedIn</p>
                <p className="text-gray-600">
                  {company?.linkedInProfile || 'linkedin.com/company/our-company'}
                </p>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Send us a message
            </button>
          </div>
        </div>
      </div>
  )
}
export default ContactEmployee