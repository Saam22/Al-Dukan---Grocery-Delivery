import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user = {
        name: "Saad Mahamed",
        email: "saad@example.com",
        isAdmin: true,
    }
    const{cartCount, setCartOpen} = {
        cartCount: 5,
        setCartOpen: (_data) => {},
    }
    const[searchQuery, setSearchQuery] = React.useState("")
    const[userMenuOpen, setUserMenuOpen] = React.useState(false)
    const navigate = useNavigate() 

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">
        <div>

        </div>
    </nav>
  )
}

export default Navbar