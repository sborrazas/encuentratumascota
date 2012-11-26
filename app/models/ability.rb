class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :main
    can :read, Publication
    if user
      can :create, Publication
      if user.is_admin?
        can :manage, Publication
        can :manage, User
      end
    else
      can :create, :registration
      can [:create, :create_with_omniauth], :session
    end
  end
end
