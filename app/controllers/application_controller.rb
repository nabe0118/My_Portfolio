class ApplicationController < ActionController::Base
  class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    # mypage_root_path # ログイン後に遷移するpathを設定
  end

  def after_sign_out_path_for(resource)
    tops_path
  end
end
end
