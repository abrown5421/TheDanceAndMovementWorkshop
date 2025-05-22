import React from 'react';
import { useAppSelector } from '../../app/store/hooks'; 
import { Loader as DefaultLoader, LoaderCircle, LoaderPinwheel, RefreshCw, RotateCw} from 'lucide-react';
import type { CircularLoaderProps } from './circularLoaderTypes';
import clsx from 'clsx';

const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'LoaderCircle':
      return LoaderCircle;
    case 'LoaderPinwheel':
      return LoaderPinwheel;
    case 'RefreshCw':
      return RefreshCw;
    case 'RotateCw':
      return RotateCw;
    case 'Loader':
    default:
      return DefaultLoader;
  }
};

const CircularLoader: React.FC<CircularLoaderProps> = ({ icon, className }) => {
  const { loaderLoad } = useAppSelector((state) => state.loader);

  if (!loaderLoad) return null;

  const IconComponent = getIconComponent(icon);

  return (
    <div className="flex items-center justify-center">
      <IconComponent className={clsx('animate-spin h-6 w-6', className)} />
    </div>
  );
};

export default CircularLoader;
