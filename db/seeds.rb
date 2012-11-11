# Admin users
%w(snt.aln@gmail.com seba.borrazas@gmail.com mdaguerre@gmail.com).each do |admin_user_email|
  AdminUser.create!(email: admin_user_email, password: 'lareputamadre') unless AdminUser.where(email: admin_user_email).exists?
end
