import React from 'react'

function FeaturesAndPartners({ companyInfo }) {
  return (
      <>
        {/* Features */}
        {companyInfo?.features?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Our Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {companyInfo.features.map((feature) => (
                    <div key={feature.title} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 mb-4">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                ))}
              </div>
            </div>
        )}

        {/* Partners */}
        {companyInfo?.partners?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Our Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {companyInfo.partners.map((partner) => (
                    <div
                        key={partner.name}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{partner.name}</h3>
                        <p className="text-sm text-gray-600">
                          {partner.industry}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        )}
      </>
  )
}

export default FeaturesAndPartners