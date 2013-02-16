class NotificationMailer < ActionMailer::Base

  default from: 'encuentratumascotaorg@gmail.com'

  ADMIN_EMAILS = 'seba.borrazas@gmail.com' #, snt.aln@gmail.com'

  def send_error_email(exception, env)
    content = %Q(
      Exception: #{exception.message}.

      Bactrace: #{exception.backtrace.join("\n")}

      URL: #{env['REQUEST_METHOD']} #{env['REQUEST_URI']}.

      SESSION: #{env['action_dispatch.request.unsigned_session_cookie'].inspect}.
    )

    mail(to: ADMIN_EMAILS, subject: "ETM ERROR: #{exception.message}") do |format|
      format.text { render text: content }
    end
  end
end
