import React from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { Instagram, Facebook } from 'lucide-react';
import IconButton from "../../components/iconButton/IconButton";
 
 const SocialBar: React.FC = () => {
    const SocialBar = useAppSelector((state) => state.socialBar)

     return (
         <div className="flex flex-row flex-3/4 justify-around">
            <IconButton color="text-primary" ariaLabel="Favorite" onClick={() => alert('Facebook!')}>
                <Facebook />
            </IconButton>
            <IconButton color="text-primary" ariaLabel="Favorite" onClick={() => alert('Instagram!')}>
                <Instagram />
            </IconButton>
         </div>
     );
 };
 export default SocialBar;
