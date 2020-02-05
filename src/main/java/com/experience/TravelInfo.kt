package com.experience

import java.net.URL

class TravelInfo(
        var nation: String? = null,
        val travelName: String,
        val duration: String,
        val services: Services,
        val price: String,
        val itinerary: List<String>,
        val commonCash: CommonCash,
        val companyId: Int?,
        val tourLink: URL?
)
