import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { Instagram, Facebook, Youtube, Linkedin, } from 'lucide-react';
import IconButton from "../../components/iconButton/IconButton";
import { fetchSocials } from './socialBarApi';
import { setSocialBar } from './socialBarSlice';
 
 const SocialBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const SocialBar = useAppSelector((state) => state.socialBar)

    useEffect(() => {
        const getSocials = async () => {
            const socials = await fetchSocials();
            if (socials) {
                dispatch(setSocialBar({ socials, iconColor: 'primary' }));
            }
        };
        getSocials();
    }, []);

    
    return (
        <div className="flex flex-row flex-3/4 justify-around mx-auto sm:mx-0">
            {SocialBar.socials.map((social) => (
                <IconButton key={social.socialName} color="text-primary" ariaLabel={social.socialName} onClick={() => window.open(social.socialLink, "_blank")}>
                    {social.socialName === "Facebook" && <Facebook />}
                    {social.socialName === "Instagram" && <Instagram />}
                    {social.socialName === "Youtube" && <Youtube />}
                    {social.socialName === "LinkedIn" && <Linkedin />}
                </IconButton>
            ))}
        </div>
    );
 };
 export default SocialBar;
