import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// API functions for listings
export const listingsAPI = {
  // Fetch all listings with optional sorting and filtering
  async getAll(sortBy = 'created_at', filters = {}) {
    let query = supabase.from('listings').select('*')
    
    // Apply filters
    if (filters.priceMin) {
      query = query.gte('rent', parseFloat(filters.priceMin))
    }
    if (filters.priceMax) {
      query = query.lte('rent', parseFloat(filters.priceMax))
    }
    if (filters.bedrooms) {
      const bedrooms = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms)
      if (filters.bedrooms === '5+') {
        query = query.gte('bedrooms', bedrooms)
      } else {
        query = query.eq('bedrooms', bedrooms)
      }
    }
    if (filters.bathrooms) {
      const bathrooms = filters.bathrooms === '3.5+' ? 3.5 : parseFloat(filters.bathrooms)
      if (filters.bathrooms === '3.5+') {
        query = query.gte('bathrooms', bathrooms)
      } else {
        query = query.eq('bathrooms', bathrooms)
      }
    }
    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`)
    }
    if (filters.state) {
      query = query.ilike('state', `%${filters.state}%`)
    }
    if (filters.zipcode) {
      query = query.ilike('zipcode', `%${filters.zipcode}%`)
    }
    if (filters.minUpvotes) {
      query = query.gte('upvotes', parseInt(filters.minUpvotes))
    }
    if (filters.daysOld) {
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(filters.daysOld))
      query = query.gte('created_at', daysAgo.toISOString())
    }
    
    // Apply sorting
    if (sortBy === 'rent_desc') {
      query = query.order('rent', { ascending: false })
    } else if (sortBy === 'rent') {
      query = query.order('rent', { ascending: true })
    } else {
      query = query.order(sortBy, { ascending: sortBy === 'created_at' ? false : false })
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching listings:', error)
      throw error
    }
    
    return data
  },

  // Get a single listing by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching listing:', error)
      throw error
    }
    
    return data
  },

  // Search listings by title with filters
  async search(searchTerm, sortBy = 'created_at', filters = {}) {
    let query = supabase
      .from('listings')
      .select('*')
      .ilike('title', `%${searchTerm}%`)
    
    // Apply the same filters as getAll
    if (filters.priceMin) {
      query = query.gte('rent', parseFloat(filters.priceMin))
    }
    if (filters.priceMax) {
      query = query.lte('rent', parseFloat(filters.priceMax))
    }
    if (filters.bedrooms) {
      const bedrooms = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms)
      if (filters.bedrooms === '5+') {
        query = query.gte('bedrooms', bedrooms)
      } else {
        query = query.eq('bedrooms', bedrooms)
      }
    }
    if (filters.bathrooms) {
      const bathrooms = filters.bathrooms === '3.5+' ? 3.5 : parseFloat(filters.bathrooms)
      if (filters.bathrooms === '3.5+') {
        query = query.gte('bathrooms', bathrooms)
      } else {
        query = query.eq('bathrooms', bathrooms)
      }
    }
    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`)
    }
    if (filters.state) {
      query = query.ilike('state', `%${filters.state}%`)
    }
    if (filters.zipcode) {
      query = query.ilike('zipcode', `%${filters.zipcode}%`)
    }
    if (filters.minUpvotes) {
      query = query.gte('upvotes', parseInt(filters.minUpvotes))
    }
    if (filters.daysOld) {
      const daysAgo = new Date()
      daysAgo.setDate(daysAgo.getDate() - parseInt(filters.daysOld))
      query = query.gte('created_at', daysAgo.toISOString())
    }
    
    if (sortBy === 'rent_desc') {
      query = query.order('rent', { ascending: false })
    } else if (sortBy === 'rent') {
      query = query.order('rent', { ascending: true })
    } else {
      query = query.order(sortBy, { ascending: sortBy === 'created_at' ? false : false })
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error searching listings:', error)
      throw error
    }
    
    return data
  },

  // Create a new listing
  async create(listing) {
    const { data, error } = await supabase
      .from('listings')
      .insert([listing])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating listing:', error)
      throw error
    }
    
    return data
  },

  // Update a listing
  async update(id, updates) {
    const { data, error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating listing:', error)
      throw error
    }
    
    return data
  },

  // Delete a listing
  async delete(id) {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting listing:', error)
      throw error
    }
    
    return true
  },

  // Increment upvotes
  async upvote(id) {
    // First get current upvote count
    const { data: currentListing, error: fetchError } = await supabase
      .from('listings')
      .select('upvotes')
      .eq('id', id)
      .single()
    
    if (fetchError) {
      console.error('Error fetching current upvotes:', fetchError)
      throw fetchError
    }
    
    // Then increment the count
    const { data, error } = await supabase
      .from('listings')
      .update({ 
        upvotes: (currentListing.upvotes || 0) + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error upvoting listing:', error)
      throw error
    }
    
    return data
  }
}

// API functions for comments
export const commentsAPI = {
  // Get all comments for a listing
  async getByListingId(listingId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error fetching comments:', error)
      throw error
    }
    
    return data
  },

  // Create a new comment
  async create(comment) {
    const { data, error } = await supabase
      .from('comments')
      .insert([comment])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating comment:', error)
      throw error
    }
    
    return data
  },

  // Delete a comment
  async delete(id) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting comment:', error)
      throw error
    }
    
    return true
  }
}