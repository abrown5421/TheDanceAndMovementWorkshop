export function getTimeOfDay(): 'Morning' | 'Afternoon' | 'Evening' {
    const hour = new Date().getHours();
  
    if (hour < 12) {
      return 'Morning';
    } else if (hour < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
}
  