import React from "react";
import silverCard from "../Assets/silver-card2.png";
import silverIcon from "../Assets/silver-rank.png";
import goldCard from "../Assets/gold-card.png";
import goldIcon from "../Assets/gold-rank.png";
import diamondCard from "../Assets/diamond-card.png";
import diamondIcon from "../Assets/diamond-rank.png";
export const Ranking_rules = () => {
  return (
    <div className="desktop_big flex-1 box-border bg-white rounded-xl min-h-[300px] h-fit p-6">
      <div className="rankingRulesNew">
        <div className="desktop_head text-[24px] font-bold leading-8">
          Quy chế xếp hạng
        </div>
        <div className="mt-6 grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-6">
          <div className="ranking_col-1">
            <div
              className="rankingRulesNew_banner"
              style={{ backgroundImage: `url(${silverCard})` }}
            >
              <div className="rankingRulesNew_row flex items-center py-[5px] w-full">
                <div className="rankingRulesNew_icon">
                  <img src={silverIcon} alt="rank icon" />
                </div>
                <div className="rankingRulesNew_content pl-[10px]">
                  <p className="font-bold text-[17px] text-white">Bạc</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ranking_col-2">
            <div
              className="rankingRulesNew_banner"
              style={{ backgroundImage: `url(${goldCard})` }}
            >
              <div className="rankingRulesNew_row flex items-center py-[5px] w-full">
                <div className="rankingRulesNew_icon">
                  <img src={goldIcon} alt="rank icon" />
                </div>
                <div className="rankingRulesNew_content pl-[10px]">
                  <p className="font-bold text-[17px] text-white">Vàng</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ranking_col-2">
            <div
              className="rankingRulesNew_banner"
              style={{ backgroundImage: `url(${diamondCard})` }}
            >
              <div className="rankingRulesNew_row flex items-center py-[5px] w-full">
                <div className="rankingRulesNew_icon">
                  <img src={diamondIcon} alt="rank icon" />
                </div>
                <div className="rankingRulesNew_content pl-[10px]">
                  <p className="font-bold text-[17px] text-white">Kim cương</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] gap-6">
          <div>
            <div className="ranking_privilege">
              <div className="text-[#112950] text-[15px] font-bold">
                Đặc quyền ưu đãi
              </div>
              <div className="mt-3">
                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Tích điểm 1%</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Quà tặng sinh nhật</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Mua sản phẩm thứ 2 giá 1k</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Ưu đãi đến 50%</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Quà tặng bất ngờ</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="ranking_condition">
              <div className="ranking_condition-content">
                <div className="text-[#112950] text-[15px] font-bold">
                  Điều kiện nâng hạng
                </div>
                <div className="mt-3">
                  <p className="font-normal text-[13px] text[#112950] mb-2">
                    Khách hàng có mức chi tiêu tích lũy từ 4.000.000 VND trở lên
                    trong vòng 1 năm sẽ được nâng hạng vàng.
                  </p>
                </div>
              </div>
              <div className="ranking_condition-note mb-3 text-[13px]">
                <b>Lưu : </b> Khách hàng hạng Bạc sẽ được nâng hạng Vàng
                trong vòng 1h sau khi tích đủ chi tiêu từ 4.000.000 đ.
              </div>
            </div>

            <div className="ranking_privilege">
              <div className="text-[#112950] text-[15px] font-bold">
                Đặc quyền ưu đãi
              </div>
              <div className="mt-3">
                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Tích điểm 1.1%</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Quà tặng sinh nhật</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Mua sản phẩm thứ 2 giá 1k</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Ưu đãi đến 50%</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Quà tặng bất ngờ</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="ranking_condition">
              <div className="ranking_condition-content">
                <div className="text-[#112950] text-[15px] font-bold">
                  Điều kiện nâng hạng
                </div>
                <div className="mt-3">
                  <p className="font-normal text-[13px] text[#112950] mb-2">
                    Khách hàng có mức chi tiêu tích lũy từ 8.000.000 VND trở lên
                    trong vòng 1 năm sẽ được nâng hạng kim cương.
                  </p>
                </div>
              </div>
              <div className="ranking_condition-note mb-3 text-[13px]">
                <b>Lưu : </b> Khách hàng hạng Vàng sẽ được nâng hạng Kim Cương
                trong vòng 1h sau khi tích đủ chi tiêu từ 8.000.000 đ.
              </div>
            </div>

            <div className="ranking_privilege">
              <div className="text-[#112950] text-[15px] font-bold">
                Đặc quyền ưu đãi
              </div>
              <div className="mt-3">
                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Tích điểm 1.5%</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Quà tặng sinh nhật</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Mua sản phẩm thứ 2 giá 1k</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Ưu đãi đến 50%</span>
                </div>

                <div className="Privilege_item">
                  <span className="w-[12px] mr-[10px]">
                    <i className="fa-solid fa-circle-check w-[12px]"></i>
                  </span>
                  <span>Quà tặng bất ngờ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
