import assets from '../../src/assets/assets'


const Header = () => {
  return (
    <div className='bg-gray2 border'>
      <div className='flex flex-row justify-between items-center my-1 mx-3 sm:my-3 sm:mx-16 bg-gray2 '>
        <img className='w-[71px] sm:w-[106.5px]' src={assets.logo} alt="" />
        
        
        <button className="bg-primary border-2 border-primary text-white px-8 py-[10px] sm:px-[71px] text-sm sm:text-base rounded-md transition text-center">Contact Us</button>
      </div>
    </div>
  )
}

export default Header
