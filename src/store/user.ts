import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface IUSer{
    toggle:boolean,
    setToggle:()=>void
}
export const useUserStore = create<IUSer>()(
    persist(
        (set) => ({
            toggle: false,
            setToggle: () => {
                set((state) => ({
                    toggle: !state.toggle,
                }));
            }
        }),
        {
            name: 'caban',
            partialize: (state) => ({
                toggle: state.toggle
            })
        }
    )
);