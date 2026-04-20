import React from 'react';

export default function LibraryGallery() {
  return (
    <div className="flex-1 p-8 lg:p-12 technical-void">
      {/* Page Header & Filter Bar */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-on-surface-variant">COLLECTIVE INTELLIGENCE</span>
            <h2 className="text-5xl font-black tracking-tight text-on-surface mt-2">Community Library</h2>
          </div>
          {/* Filters - Glassmorphism Pill */}
          <div className="glass-panel p-1 rounded-full flex items-center gap-1 border border-outline-variant/15 overflow-x-auto">
            <button className="px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap">All Streams</button>
            <button className="px-5 py-2 rounded-full text-on-surface-variant hover:text-on-surface text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap">Sorting</button>
            <button className="px-5 py-2 rounded-full text-on-surface-variant hover:text-on-surface text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap">Graphs</button>
            <button className="px-5 py-2 rounded-full text-on-surface-variant hover:text-on-surface text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap">Dynamic</button>
            <div className="h-6 w-px bg-outline-variant/30 mx-2 flex-shrink-0"></div>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors flex-shrink-0">
              <span className="material-symbols-outlined" data-icon="tune">tune</span>
            </button>
          </div>
        </div>
      </div>
      {/* Bento Grid of Visualizations */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Featured Large */}
        <div className="col-span-1 md:col-span-2 lg:row-span-2 glass-panel rounded-xl overflow-hidden group border border-outline-variant/15 flex flex-col cursor-pointer">
          <div className="relative aspect-video lg:aspect-auto flex-1 overflow-hidden">
            <img alt="Visualization of a complex neural network structure with glowing nodes and cyan connection lines" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVO-Y__u8vbL2vArfi0mjS3thF5j8NnEBPN4hR5QsWxyZVLG6k9t70d_cVGbozlS2ZujDlrrDuewtOBL1S6pDBFbo4C083sQRTWTfX6PJAu-sOMvMiLkwdE-o86Zp6qWm0U-HWS0JkaholX3TNnybn5JhaWpugQLqhFXCkYwsG3GKrGkmgE5aYzaj022a4HVpnjP41rGF8dgwvZPvd-ZO_yVqf0PWYXNhy1lNa9rx3aYSsqOHDRpKR_lT_k1i85g6ASuhlcH3tvw"/>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-mono text-[10px] uppercase tracking-widest rounded-sm">Featured</span>
              <span className="px-3 py-1 bg-secondary-container/30 backdrop-blur-md border border-secondary-container/30 text-secondary font-mono text-[10px] uppercase tracking-widest rounded-sm">O(V + E)</span>
            </div>
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-on-surface mb-1">Dijkstra's Pathfinding Visualizer</h3>
                <p className="text-on-surface-variant text-sm max-w-lg">A deep exploration of weighted graph traversal using a layered topological approach with real-time heuristic updates.</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-sm" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-mono text-sm font-bold">4.9</span>
                </div>
                <span className="text-[10px] text-outline uppercase tracking-tighter">1.2k Ratings</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center overflow-hidden">
                  <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhwXDBaiiZphaX4-6UMPn_q7zllZAL-674Myb2uSez4iuVijUuK_Pe2ovClZeqJ05Q7M58zF6x6wRlm-vkvzcE3akTMZ7uhuvN_eZDfIw1qd-0-xquB7ROhnlJMULS0G5vXda9ZnlLXFsFqse0hjjCV3Eo1-ImgrcH4cI_k6NyN4UyzsOBbuiUJOihoEWEosZKywSMfvrnLIoASnaJ2zRLkswpmWTN3axhxMs1rEOV7dY4bJ59X1R37r-2Gd1bnQ0hlQJNbZzu6g"/>
                </div>
                <span className="text-xs font-medium text-on-surface">Alex "Vector" Chen</span>
              </div>
              <button className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                Launch Instance <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="glass-panel rounded-xl overflow-hidden border border-outline-variant/15 flex flex-col group cursor-pointer">
          <div className="aspect-video overflow-hidden relative">
            <img alt="Sorting algorithm visualization with tall colorful bars" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqR4SoEwjndlpVzoaALPms-LC7au7Z77j-tmjgkvXBqEmTZMK7MWLCdaXLS97Tso9j3_LUp_ysAJEcTLC40QsZRaLyvDTM6FjwJ14qevKXTmOY6JkM2MX4AZ7d64noGe3R3Z-4F2u7agH5mtTk_Po3q_H6_GSSdETZ01d622xi61d5ibyAYzjC3ca0y8es7f0MXSh2Ksw0yqDqqIHTJ8wUD4GJq1szvEEBfjgmP89QejFjpSOFa4MKX4_QPd_FPOmimxW4RL68zQ"/>
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-secondary">Sorting / O(n log n)</span>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-xs" data-icon="visibility">visibility</span>
                <span className="font-mono text-[10px]">842</span>
              </div>
            </div>
            <h4 className="font-bold text-lg text-on-surface mb-2">Recursive QuickSort</h4>
            <p className="text-on-surface-variant text-xs line-clamp-2 mb-6">Visualizing the pivot selection and partition process in high-frequency data streams.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest overflow-hidden">
                  <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG9wNj5oLhocgraxT8E2WWhjZGADvcU-IJcmBXFOc1wHTHxxtmlBbWIHCGlT12zrOiw4tgqWU-uykRQff2Rpm_wMLKmAWjaqpVnd0vaZgCPU7Hv24KZ3PrHy8mRIk3SSJ72VZnSuiHalO9JONjUki5iHAq4RZyNU0GLapEeyPk1xBap_jF7Wn4FOuPr_y3hojvjv3zRWBju-z_s3rr9qhfoiE9Zu9bAF36Ji_vvcvJj9_jo87Gnj9jH6xEgKqUiwMbX4Ew2diehw"/>
                </div>
                <span className="text-[10px] text-on-surface-variant">dev_null</span>
              </div>
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-xs" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-mono text-xs">4.7</span>
              </div>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="glass-panel rounded-xl overflow-hidden border border-outline-variant/15 flex flex-col group cursor-pointer">
          <div className="aspect-video overflow-hidden relative">
            <img alt="Network node visualization" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUhOjNjBY9P4OL1ochvDQ5S9uBQCP_T1GNvdGqiwob3RgmBaDrxaaCn-IJ64i9g0Ngxmlw0lwV55vdZytwZjmBQU1jEzwNWwxdBG17_Xl7K6-ZHZtcQ-xUTQvVkftwNEdVZMVjuBwK3-zdgUSkx71A7PQZ5sAPt5GiAT0Ronu_qy6x8F84qmEOEKGAtlnIL_NZjDWBVOHkE-09IsTEN3CsfmJpWt665yRz5uJaABs7UNCL0SAPFy7zmK5HbspG8iybucqXjrnbmA"/>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-tertiary">Graphs / O(V^2)</span>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-xs" data-icon="visibility">visibility</span>
                <span className="font-mono text-[10px]">2.1k</span>
              </div>
            </div>
            <h4 className="font-bold text-lg text-on-surface mb-2">Prim's MST Logic</h4>
            <p className="text-on-surface-variant text-xs line-clamp-2 mb-6">Building a Minimum Spanning Tree from a dense cloud of coordinate points.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest overflow-hidden">
                  <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3u7wR9fm2bKvacIe_lcQX6IuiCUL2uh-wj5Gezo94zOOPyYkxIr6IRtsQvNuB0nFNQ7Frw9X1l5gvPGLUML3IN5gSPgZr6bEzBHKhHuSaWQ5Pvyx7OW5SqOgMCfOtB7YUKTQvaJVOET6Jc282vx9DwxqBV_80Z88uyCN6EnY_OBEn023tSZyeuERALGlM8ocdMdiCX1Zih7QPBTxIhKkxyp9vLLROm69e7IEb_MTrqeIJWi5GMant5uWxxj53WTxV9k7djggSiA"/>
                </div>
                <span className="text-[10px] text-on-surface-variant">SarahCodes</span>
              </div>
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-xs" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-mono text-xs">4.8</span>
              </div>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="glass-panel rounded-xl overflow-hidden border border-outline-variant/15 flex flex-col group cursor-pointer">
          <div className="aspect-video overflow-hidden relative">
            <img alt="Mathematical pattern visualization" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3-HhL-12NLFNz7v4uBgsjXYWjShGamwuTqTUznadAb6w5ZhIn8VC0liA_PFlYQVzBiL7-1ImC5Nm4DcpkRKXvQWjAsby1v4UsGFFN_SgZfLKTbdNqUCyMcdZ-2bpT_ZrHw9SaChaHH97BYvi-4ZRdg_hUGSgckLO5vq32A1xDvM5Qp2KzmxcmgkyixmM9audrhC1WM7SEaancgMf2_61hW2U44pZDXyV6caYsISfJh6Du2Td7QRhlPo2h0-LYPZyeTaHg6p3uxw"/>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-secondary">Dynamic / O(nW)</span>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-xs" data-icon="visibility">visibility</span>
                <span className="font-mono text-[10px]">512</span>
              </div>
            </div>
            <h4 className="font-bold text-lg text-on-surface mb-2">Knapsack Problem 0/1</h4>
            <p className="text-on-surface-variant text-xs line-clamp-2 mb-6">A table-based visualization showing how sub-problems build the optimal solution.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest overflow-hidden">
                  <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeoQLTyyg6i08e3eNhmGGv1_JWEX0umQ0S7Wtd_fvog577BYElxJTRkMd2B2XZS9OSPqmADwdgvHPW0znnwxfzER1_Hmg8EpfbguFifEMx-hU1DFmyVC8t14EEsUCyxxT_cnDBntXAL8vl7CMFOFVBVQzBPjMkRPoVkMEWj5QYKWkncEeecRVPXBggllF910v2Esq0_G2xedqpxWK9gWCxCehputNQRZBXpC4IgRZtbjbw0cP1jwD6ZrzMuPlF-4ZFOCbShMyV3w"/>
                </div>
                <span className="text-[10px] text-on-surface-variant">AlgorithmHero</span>
              </div>
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-xs" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-mono text-xs">4.5</span>
              </div>
            </div>
          </div>
        </div>
        {/* Card 5 */}
        <div className="glass-panel rounded-xl overflow-hidden border border-outline-variant/15 flex flex-col group cursor-pointer">
          <div className="aspect-video overflow-hidden relative">
            <img alt="Tree data structure visualization" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDexaccc7581Er44P1IcczFFcP_hzvsiC8pKN3t3itVGq229tG7K_bPjv5nmRdx5K_ZJ7Ssa_yzlbPQx1Zdp4uq7cYUzLsk5HkX3SBdKYOGh0s4fEXRWVTLuGeawNkgSjFv5c568umg57DrTAyWUwqX5q2OQXkISbZ-7VYKyIYwit6L8l3uJ34tfmyfkPVrL8oDU_DP75Ed1l2Kp4ofX7gLzkCYeD2BhePW7icJ1oUTzWTQmTbvQJuoDrrTd07mlZqaZEhOtw9N8w"/>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary">Trees / O(log n)</span>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-xs" data-icon="visibility">visibility</span>
                <span className="font-mono text-[10px]">1.5k</span>
              </div>
            </div>
            <h4 className="font-bold text-lg text-on-surface mb-2">Red-Black Tree Rebalancing</h4>
            <p className="text-on-surface-variant text-xs line-clamp-2 mb-6">Interactive rotations and color changes during node insertions and deletions.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest overflow-hidden">
                  <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlZ0qYdCer3EQO2jKld9UeUjZqgTpYsdE65F4rnUvv6uncig8rupDYtH-2vHdslrd_ITOSWlWDW0RQ5ewS8eSaJyIihcyGYqllLlLoxfEKbx8IR7_o_V96BnsQl6ga0LfBqu1Md7d0e3rQh1UzI1udclGnotlyQJqHkhPUu5yaJFJdW6RA4xOCKh1EQgL5lTs4OWuWqQZlCOivb6_RAXpBHqEtPrd7eA74ykI60FcL7jN5Laz3-AvWb_tsg35kymEb68OOARvMJw"/>
                </div>
                <span className="text-[10px] text-on-surface-variant">CodeQueen</span>
              </div>
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-xs" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-mono text-xs">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
